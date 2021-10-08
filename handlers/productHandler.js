const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { responseMessages } = require('../lib');
const {
	Categories,
	SubCategories,
	Products,
	ProductPrice,
	MeasuringUnits,
	ProductHistory,
} = require('../models');

const productHandler = {
	getHomeCategories: async () => {
		return new Promise((resolve, reject) => {
			try {
				Categories.findAll({
					where: { status: 'ACTIVE' },
					attributes: ['id', 'name', 'is_sub_category'],
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
				Products.findAll({
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
					],
					raw: true,
				})
					.then((productDetails) => {
						let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

						for (let i = 0; i < productDetails.length; i++) {
							let discountStartDate = moment(
								productDetails[i].discountStartDate
							).format('YYYY-MM-DD HH:mm:ss');

							let discountEndDate = moment(
								productDetails[i].discountEndDate
							).format('YYYY-MM-DD HH:mm:ss');

							if (
								discountStartDate <= currentDate &&
								discountEndDate >= currentDate
							) {
								productDetails[i].discountStatus = true;
								let discountPrice =
									(productDetails[i].discountPercent / 100) *
									productDetails[i].price;
								discountPrice = productDetails[i].price - discountPrice;
								productDetails[i].discountPrice = discountPrice;
							} else {
								productDetails[i].discountStatus = false;
							}
						}

						resolve({
							response: responseMessages.SUCCESS,
							finalData: { productDetails: productDetails[0] },
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
						['max_quantity', 'maxQuantity'],
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
				}).then((cartProductDetails) => {
					console.log(cartProductDetails);
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
							productQuantity < cartProductDetails[i].maxQuantity &&
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

	getProductOffers: async () => {
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
				})
					.then((productDetails) => {
						for (let i = 0; i < productDetails.length; i++) {
							let discountPrice =
								(productDetails[i].discountPercent / 100) *
								productDetails[i].actualPrice;
							discountPrice = productDetails[i].actualPrice - discountPrice;
							productDetails[i].discountPrice = discountPrice;
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
		try {
			return new Promise(async (resolve, reject) => {
				try {
					let existingProductHistory = await ProductHistory.findAll({
						where: { id: payload.productHistoryId },
					});

					if (existingProductHistory && existingProductHistory.length === 0) {
						await ProductHistory.create({
							user_id: userDetails.id,
							product_id: payload.productId,
						});
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
		} catch (err) {
			throw err;
		}
	},

	viewUserProductHistory: async (userDetails) => {
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
						[sequelize.col('product.image'), 'image'],
						[sequelize.col('product.id'), 'productId'],
						[sequelize.col('product.name'), 'name'],
						[
							sequelize.col('product.product_price.actual_price'),
							'actualPrice',
						],
						[
							sequelize.col('product.product_price.discount_percent'),
							'discountPercent',
						],
						[
							sequelize.col('product.product_price.discount_start_date'),
							'discountStartDate',
						],
					],
					raw: true,
				})
					.then((userProductHistory) => {
						let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

						for (let i = 0; i < userProductHistory.length; i++) {
							let discountStartDate = moment(
								userProductHistory[i].discountStartDate
							).format('YYYY-MM-DD HH:mm:ss');

							let discountEndDate = moment(
								userProductHistory[i].discountEndDate
							).format('YYYY-MM-DD HH:mm:ss');

							if (
								discountStartDate <= currentDate &&
								discountEndDate >= currentDate
							) {
								let discountPrice =
									(userProductHistory[i].discountPercent / 100) *
									userProductHistory[i].price;
								discountPrice = userProductHistory[i].price - discountPrice;
								userProductHistory[i].price = discountPrice;
							}
						}

						resolve({
							response: responseMessages.SUCCESS,
							finalData: { userProductHistory },
						});
					})
					.catch((err) => {
						console.log(err);
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
};

module.exports = productHandler;
