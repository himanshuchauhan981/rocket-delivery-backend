const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { responseMessages, commonFunctions } = require('../lib');
const {
	Categories,
	SubCategories,
	Products,
	ProductPrice,
	MeasuringUnits,
	ProductHistory,
	Orders,
	OrderProducts,
	ProductReview,
} = require('../models');

const mostBookedProducts = async (userDetails) => {
	return new Promise((resolve, reject) => {
		try {
			Orders.findAll({
				where: { user_id: userDetails.id },
				include: [
					{
						model: OrderProducts,
						attributes: [],
					},
				],
				attributes: [
					'order_products.product_id',
					sequelize.fn('COUNT', sequelize.col('order_products.product_id')),
				],
				group: ['order_products.product_id'],
				order: [['count', 'DESC']],
				raw: true,
				subQuery: false,
				limit: 5,
			})
				.then(async (orderDetails) => {
					let finalOrderDetails = [];
					for (let i = 0; i < orderDetails.length; i++) {
						let orderObject = {};
						let productDetails = await Products.findAll({
							where: { id: orderDetails[i].product_id },
							include: [{ model: ProductPrice, attributes: [] }],
							attributes: [
								'id',
								'name',
								'image',
								'product_price.actual_price',
								'product_price.discount_percent',
								'product_price.discount_start_date',
								'product_price.discount_end_date',
							],
							raw: true,
						});

						if (productDetails && productDetails.length > 0) {
							let discountDetails = commonFunctions.calculateDiscountPrice(
								productDetails[0].discount_start_date,
								productDetails[0].discount_end_date,
								productDetails[0].discount_percent,
								productDetails[0].actual_price
							);

							let productReviewDetails = await ProductReview.findAll({
								where: {
									[Op.and]: [
										{ product_id: orderDetails[i].product_id },
										{ is_deleted: 0 },
									],
								},
								attributes: ['id', 'ratings'],
							});
							let ratingCount = 0;
							for (let i = 0; i < productReviewDetails.length; i++) {
								ratingCount = ratingCount + productReviewDetails[i].ratings;
							}

							let averageRatings =
								productReviewDetails.length === 0
									? 0
									: ratingCount / productReviewDetails.length;

							orderObject.count = orderDetails[i].count;
							orderObject.product_id = orderDetails[i].product_id;
							orderObject.product_name = productDetails[0].name;
							orderObject.product_image = productDetails[0].image;
							orderObject.actual_price = productDetails[0].actual_price;
							orderObject.discount_status = discountDetails.discountStatus;
							orderObject.discount_price = discountDetails.discountPrice;
							orderObject.discount_start_date =
								productDetails[0].discount_start_date;
							orderObject.discount_end_date =
								productDetails[0].discount_end_date;
							orderObject.discount_percent = productDetails[0].discount_percent;
							orderObject.averageRatings = averageRatings;
						}
						finalOrderDetails.push(orderObject);
					}
					resolve(finalOrderDetails);
				})
				.catch((err) => {
					reject(err);
				});
		} catch (err) {
			reject(err);
		}
	});
};

const mostViewedProducts = async (userDetails, mostViewedHistory) => {
	return new Promise((resolve, reject) => {
		try {
			ProductHistory.findAll({
				where: { [Op.and]: [{ user_id: userDetails.id }, { is_deleted: 0 }] },
				include: [
					{
						model: Products,
						attributes: [],
						include: [{ model: ProductPrice, attributes: [] }],
					},
				],

				attributes: [
					'id',
					'view_count',
					[sequelize.col('product.image'), 'image'],
					[sequelize.col('product.id'), 'productId'],
					[sequelize.col('product.name'), 'name'],
					[sequelize.col('product.product_price.actual_price'), 'actualPrice'],
					[
						sequelize.col('product.product_price.discount_percent'),
						'discountPercent',
					],
					[
						sequelize.col('product.product_price.discount_start_date'),
						'discountStartDate',
					],
					[
						sequelize.col('product.product_price.discount_end_date'),
						'discountEndDate',
					],
				],
				raw: true,
				order: mostViewedHistory ? [['view_count', 'DESC']] : [],
				limit: mostViewedHistory ? 2 : null,
			})
				.then((userProductHistory) => {
					for (let i = 0; i < userProductHistory.length; i++) {
						let discountDetails = commonFunctions.calculateDiscountPrice(
							userProductHistory[i].discountStartDate,
							userProductHistory[i].discountEndDate,
							userProductHistory[i].discountPercent,
							userProductHistory[i].actualPrice
						);
						userProductHistory[i].discountPrice = discountDetails.discountPrice;
						userProductHistory[i].discountStatus =
							discountDetails.discountStatus;
					}

					resolve(userProductHistory);
				})
				.catch((err) => {
					reject(err);
				});
		} catch (err) {
			reject(err);
		}
	});
};

const productHandler = {
	getHomeCategories: async () => {
		return new Promise((resolve, reject) => {
			try {
				Categories.findAll({
					where: { status: 'ACTIVE' },
					attributes: [
						'id',
						'name',
						[sequelize.col('is_sub_category'), 'isSubCategory'],
						'image',
					],
				})
					.then((categoryDetails) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { categoryDetails },
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	getSubCategoryItems: async (payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				SubCategories.findAll({
					where: {
						[Op.and]: [{ category_id: payload.categoryId, status: 'ACTIVE' }],
					},
					include: [{ model: Categories, attributes: [] }],
					attributes: [
						'id',
						'image',
						'name',
						[sequelize.col('category.name'), 'categoryName'],
					],
					raw: true,
				})
					.then((subCategoryDetails) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { subCategoryDetails },
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	getProducts: async (payload) => {
		return new Promise((resolve, reject) => {
			try {
				Products.findAll({
					where: payload.subCategoryId
						? { status: 'ACTIVE' }
						: { category_id: payload.categoryId, status: 'ACTIVE' },
					include: [
						{ model: ProductPrice, attributes: [] },
						{ model: MeasuringUnits, attributes: [] },
						payload.subCategoryId
							? {
									model: SubCategories,
									where: { id: payload.subCategoryId },
									attributes: [],
							  }
							: { model: Categories, attributes: [] },
					],

					attributes: [
						'id',
						'name',
						'image',
						'max_quantity',
						'purchase_limit',
						[sequelize.col('product_price.actual_price'), 'price'],
						[sequelize.col('measuring_unit.symbol'), 'symbol'],
						payload.subCategoryId
							? [sequelize.col('sub_category.name'), 'subCategoryName']
							: [sequelize.col('category.name'), 'subCategoryNames'],
					],
					raw: true,
				})
					.then((products) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { products },
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	getProductDetails: async (payload) => {
		return new Promise((resolve, reject) => {
			try {
				Products.findOne({
					where: { id: payload.productId },
					include: [{ model: ProductPrice, attributes: [] }],
					attributes: [
						'name',
						'image',
						[sequelize.col('max_quantity'), 'maxQuantity'],
						[sequelize.col('purchase_limit'), 'purchaseLimit'],
						'description',
						[
							sequelize.col('product_price.discount_percent'),
							'discountPercent',
						],
						[
							sequelize.col('product_price.discount_start_date'),
							'discountStartDate',
						],
						[
							sequelize.col('product_price.discount_end_date'),
							'discountEndDate',
						],
						[sequelize.col('product_price.actual_price'), 'price'],
					],
					raw: true,
				})
					.then(async (productDetails) => {
						let discountDetails = commonFunctions.calculateDiscountPrice(
							productDetails.discountStartDate,
							productDetails.discountEndDate,
							productDetails.discountPercent,
							productDetails.price
						);
						productDetails.discountStatus = discountDetails.discountStatus;
						productDetails.discountPrice = discountDetails.discountPrice;

						let productReviewDetails = await ProductReview.findAll({
							where: {
								[Op.and]: [
									{ product_id: payload.productId },
									{ is_deleted: 0 },
								],
							},
							attributes: ['id', 'ratings'],
						});
						let ratingCount = 0;
						let totalStars = productReviewDetails.length * 5;
						for (let i = 0; i < productReviewDetails.length; i++) {
							ratingCount = ratingCount + productReviewDetails[i].ratings;
						}

						let avergeRating = ratingCount / productReviewDetails.length;

						resolve({
							response: responseMessages.SUCCESS,
							finalData: {
								productDetails: productDetails,
								productRatings: avergeRating,
								totalReviews: productReviewDetails.length,
							},
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	getCartProductDetails: async (payload) => {
		return new Promise((resolve, reject) => {
			try {
				let cartItems = payload.cartItems;
				let productIds = cartItems.map((items) => items.id);
				Products.findAll({
					where: { id: { [Op.in]: productIds } },
					include: [{ model: ProductPrice, attributes: [] }],
					attributes: [
						'id',
						'name',
						'image',
						'status',
						'max_quantity',
						[sequelize.col('product_price.actual_price'), 'price'],
						[
							sequelize.col('product_price.discount_percent'),
							'discountPercent',
						],
						[
							sequelize.col('product_price.discount_start_date'),
							'discountStartDate',
						],
						[
							sequelize.col('product_price.discount_end_date'),
							'discountEndDate',
						],
					],
					raw: true,
				}).then((cartProductDetails) => {
					let tempCartProductDetails = [];
					let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

					for (let i = 0; i < cartProductDetails.length; i++) {
						let discountStartDate = moment(
							cartProductDetails[i].discountStartDate
						).format('YYYY-MM-DD HH:mm:ss');
						let discountEndDate = moment(
							cartProductDetails[i].discountEndDate
						).format('YYYY-MM-DD HH:mm:ss');
						if (
							discountStartDate <= currentDate &&
							discountEndDate >= currentDate
						) {
							let discountPrice =
								(cartProductDetails[i].discountPercent / 100) *
								cartProductDetails[i].price;
							discountPrice = cartProductDetails[i].price - discountPrice;
							cartProductDetails[i].price = discountPrice;
						}
						let productQuantity = cartItems.filter(
							(item) => item.id === cartProductDetails[i].id
						)[0].quantity;
						if (
							productQuantity < cartProductDetails[i].max_quantity &&
							payload.removeCartItem === true
						) {
							tempCartProductDetails.push({
								...cartProductDetails[i],
								quantity: productQuantity,
							});
						} else if (payload.removeCartItem === false) {
							tempCartProductDetails.push({
								...cartProductDetails[i],
								quantity: productQuantity,
							});
						}
					}

					resolve({
						response: responseMessages.SUCCESS,
						finalData: { cartProductDetails: tempCartProductDetails },
					});
				});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		}).catch((err) => {
			reject({
				response: responseMessages.SERVER_ERROR,
				finalData: {},
			});
		});
	},

	getDiscountOffers: async () => {
		return new Promise((resolve, reject) => {
			try {
				let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
				Products.findAll({
					where: {},
					include: [
						{
							model: ProductPrice,
							where: {
								[Op.and]: [
									{ discount_start_date: { [Op.lt]: currentDate } },
									{ discount_end_date: { [Op.gt]: currentDate } },
								],
							},
							attributes: [],
						},
					],
					attributes: [
						'id',
						'name',
						'image',
						[sequelize.col('product_price.actual_price'), 'actualPrice'],
						[
							sequelize.col('product_price.discount_percent'),
							'discountPercent',
						],
						[
							sequelize.col('product_price.discount_end_date'),
							'discountEndDate',
						],
					],
					raw: true,
					order: [['name']],
					limit: 5,
				})
					.then((productDetails) => {
						for (let i = 0; i < productDetails.length; i++) {
							let discountPrice =
								(productDetails[i].discountPercent / 100) *
								productDetails[i].actualPrice;
							discountPrice = productDetails[i].actualPrice - discountPrice;
							productDetails[i].discountPrice = discountPrice;
							productDetails[i].actualPrice = parseFloat(
								productDetails[i].actualPrice
							);
						}
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { productDetails },
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	addToProductHistory: async (payload, userDetails) => {
		return new Promise(async (resolve, reject) => {
			try {
				let existingProductHistory = await ProductHistory.findAll({
					where: {
						[Op.and]: [
							{ product_id: payload.productId },
							{ user_id: userDetails.id },
						],
					},
				});

				if (existingProductHistory && existingProductHistory.length === 0) {
					await ProductHistory.create({
						user_id: userDetails.id,
						product_id: payload.productId,
						view_count: 1,
						is_deleted: 0,
					});
				} else {
					await ProductHistory.increment(
						{ view_count: +1 },
						{
							where: {
								[Op.and]: [
									{ user_id: userDetails.id },
									{ product_id: payload.productId },
								],
							},
						}
					);
				}

				resolve({
					response: responseMessages.SUCCESS,
					finalData: {},
				});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	viewUserProductHistory: async (userDetails) => {
		try {
			let userProductHistory = await mostViewedProducts(userDetails, false);
			return {
				response: responseMessages.SUCCESS,
				finalData: { userProductHistory },
			};
		} catch (err) {
			reject({
				response: responseMessages.SERVER_ERROR,
				finalData: {},
			});
		}
	},

	removeFromProductHistory: async (payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				let existingProductHistory = await ProductHistory.findAll({
					where: { id: payload.productHistoryId },
				});

				if (existingProductHistory && existingProductHistory.length > 0) {
					await ProductHistory.update(
						{ is_deleted: 1 },
						{ where: { id: payload.productHistoryId } }
					);

					resolve({
						response: responseMessages.SUCCESS,
						finalData: {},
					});
				} else {
					reject({
						response: responseMessages.INVALID_PRODUCT_HISTORY_ID,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	getProductOffers: async (userDetails) => {
		try {
			let orderDetails = await mostBookedProducts(userDetails);
			let viewedProducts = await mostViewedProducts(userDetails, true);
			return {
				response: responseMessages.SUCCESS,
				finalData: { orderDetails, viewedProducts },
			};
		} catch (err) {
			return {
				response: responseMessages.SERVER_ERROR,
				finalData: {},
			};
		}
	},
};

module.exports = productHandler;
