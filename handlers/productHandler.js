import sequelize from 'sequelize';
import moment from 'moment';

import ProductHistory from '../models/productHistory.js';
import ResponseMessages from '../lib/responseMessages.js';
import ProductPrice from '../models/productPrice.js';
import Products from '../models/products.js';
import Common from '../lib/commonFunctions.js';
import Orders from '../models/orders.js';
import OrderProducts from '../models/orderProducts.js';
import ProductReview from '../models/productReview.js';
import Categories from '../models/categories.js';
import SubCategories from '../models/subCategories.js';
import MeasuringUnits from '../models/measuringUnits.js';
import Image from '../models/image.js';

export default class ProductHandler {
	#mostBookedProducts = async (userDetails) => {
		let common = new Common();
		return new Promise((resolve, reject) => {
			try {
				Orders.findAll({
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
					limit: 4,
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
								let discountDetails = common.calculateDiscountPrice(
									productDetails[0].discount_start_date,
									productDetails[0].discount_end_date,
									productDetails[0].discount_percent,
									productDetails[0].actual_price
								);

								let productReviewDetails = await ProductReview.findAll({
									where: {
										[sequelize.Op.and]: [
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
								orderObject.discount_percent =
									productDetails[0].discount_percent;
								orderObject.averageRatings = averageRatings;
							}
							finalOrderDetails.push(orderObject);
						}
						resolve(finalOrderDetails);
					})
					.catch((err) => {
						console.log('>>>>>>errr', err);
						reject(err);
					});
			} catch (err) {
				console.log('>>>>>>errr', err);
				reject(err);
			}
		});
	};

	#mostViewedProducts = async (userDetails, mostViewedHistory) => {
		let common = new Common();
		return new Promise((resolve, reject) => {
			try {
				ProductHistory.findAll({
					where: {
						[sequelize.Op.and]: [
							{ user_id: userDetails.id },
							{ is_deleted: 0 },
						],
					},
					include: [
						{
							model: Products,
							attributes: [],
							include: [
								{ model: ProductPrice, attributes: [] },
								{ model: Image, attributes: [] },
							],
						},
					],
					attributes: [
						'id',
						'view_count',
						[sequelize.col('product.id'), 'productId'],
						[sequelize.col('product.name'), 'name'],
						[
							sequelize.col('product.product_price.actual_price'),
							'actualPrice',
						],
						[sequelize.col('product.product_price.discount'), 'discount'],
						[
							sequelize.col('product.product_price.discount_type'),
							'discountType',
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
							let discountDetails = common.calculateDiscountPrice(
								userProductHistory[i].discountStartDate,
								userProductHistory[i].discountEndDate,
								userProductHistory[i].discount,
								userProductHistory[i].actualPrice,
								userProductHistory[i].discountType
							);
							userProductHistory[i].discountPrice =
								discountDetails.discountPrice;
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

	async addToProductHistory(payload, userDetails) {
		return new Promise(async (resolve, reject) => {
			try {
				let existingProductHistory = await ProductHistory.findAll({
					where: {
						[sequelize.Op.and]: [
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
								[sequelize.Op.and]: [
									{ user_id: userDetails.id },
									{ product_id: payload.productId },
								],
							},
						}
					);
				}

				resolve({
					response: ResponseMessages.SUCCESS,
					finalData: {},
				});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async viewUserProductHistory(userDetails) {
		try {
			let userProductHistory = await this.#mostViewedProducts(
				userDetails,
				false
			);
			return {
				response: ResponseMessages.SUCCESS,
				finalData: { userProductHistory },
			};
		} catch (err) {
			reject({
				response: ResponseMessages.SERVER_ERROR,
				finalData: {},
			});
		}
	}

	async removeFromProductHistory(payload) {
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
						response: ResponseMessages.SUCCESS,
						finalData: {},
					});
				} else {
					reject({
						response: ResponseMessages.INVALID_PRODUCT_HISTORY_ID,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getDiscountOffers() {
		let common = new Common();
		return new Promise((resolve, reject) => {
			try {
				let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
				Products.findAll({
					where: {},
					include: [
						{ model: Image, attributes: ['id', 'url'] },
						{
							model: ProductPrice,
							where: {
								[sequelize.Op.and]: [
									{ discount_start_date: { [sequelize.Op.lt]: currentDate } },
									{ discount_end_date: { [sequelize.Op.gt]: currentDate } },
								],
							},
							attributes: [
								'actual_price',
								'discount',
								'discount_start_date',
								'discount_end_date',
								'discount_type',
							],
						},
					],
					attributes: ['id', 'name', 'image_id'],
					order: [['name']],
					limit: 5,
				})
					.then((productDetails) => {
						const finalProductList = [];
						for (let i = 0; i < productDetails.length; i++) {
							const productPrice = productDetails[i].product_price;
							let discountDetails = common.calculateDiscountPrice(
								productPrice.discount_start_date,
								productPrice.discount_end_date,
								productPrice.discount,
								productPrice.actual_price,
								productPrice.discount_type
							);

							finalProductList.push({
								id: productDetails[i].id,
								name: productDetails[i].name,
								price_details: {
									...productPrice.dataValues,
									discount_price: discountDetails.discountPrice,
								},
								image: productDetails[i].image,
							});
						}
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { productDetails: finalProductList },
						});
					})
					.catch((err) => {
						console.log(err);
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getProductOffers(userDetails) {
		try {
			let orderDetails = await this.#mostBookedProducts(userDetails);
			let viewedProducts = await this.#mostViewedProducts(userDetails, true);
			return {
				response: ResponseMessages.SUCCESS,
				finalData: { orderDetails, viewedProducts },
			};
		} catch (err) {
			return {
				response: ResponseMessages.SERVER_ERROR,
				finalData: {},
			};
		}
	}

	async getHomeCategories() {
		return new Promise((resolve, reject) => {
			try {
				Categories.findAll({
					where: { [sequelize.Op.and]: [{ is_active: 1 }, { is_deleted: 0 }] },
					attributes: [
						'id',
						'name',
						[sequelize.col('is_sub_category'), 'isSubCategory'],
						'image_id',
					],
					include: [{ model: Image, attributes: ['url', 'id'], as: 'image' }],
				})
					.then((categoryDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { categoryDetails },
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getSubCategoryItems(payload) {
		return new Promise(async (resolve, reject) => {
			try {
				SubCategories.findAll({
					where: {
						[sequelize.Op.and]: [
							{ category_id: payload.categoryId, is_active: 1, is_deleted: 0 },
						],
					},
					include: [{ model: Categories, attributes: [] }],
					attributes: [
						'id',
						'name',
						[sequelize.col('category.name'), 'categoryName'],
					],
					raw: true,
				})
					.then((subCategoryDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { subCategoryDetails },
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getProducts(payload) {
		return new Promise((resolve, reject) => {
			try {
				Products.findAll({
					where: payload.subCategoryId
						? { is_active: 1, is_deleted: 0 }
						: { category_id: payload.categoryId, is_active: 1, is_deleted: 0 },
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
							response: ResponseMessages.SUCCESS,
							finalData: { products },
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getProductDetails(payload) {
		let common = new Common();
		return new Promise((resolve, reject) => {
			try {
				Products.findOne({
					where: { id: payload.id },
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
						let discountDetails = common.calculateDiscountPrice(
							productDetails.discountStartDate,
							productDetails.discountEndDate,
							productDetails.discountPercent,
							productDetails.price
						);
						productDetails.discountStatus = discountDetails.discountStatus;
						productDetails.discountPrice = discountDetails.discountPrice;

						let productReviewDetails = await ProductReview.findAll({
							where: {
								[sequelize.Op.and]: [
									{ product_id: payload.id },
									{ is_deleted: 0 },
								],
							},
							attributes: ['id', 'ratings'],
						});
						let ratingCount = 0;
						for (let i = 0; i < productReviewDetails.length; i++) {
							ratingCount = ratingCount + productReviewDetails[i].ratings;
						}

						let avergeRating = ratingCount / productReviewDetails.length;

						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: {
								productDetails: productDetails,
								productRatings: avergeRating,
								totalReviews: productReviewDetails.length,
							},
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async getCartProductDetails(payload) {
		return new Promise((resolve, reject) => {
			try {
				let cartItems = payload.cartItems;
				let productIds = cartItems.map((items) => items.id);
				Products.findAll({
					where: { id: { [sequelize.Op.in]: productIds } },
					include: [{ model: ProductPrice, attributes: [] }],
					attributes: [
						'id',
						'name',
						'image',
						'status',
						'max_quantity',
						'purchase_limit',
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
						response: ResponseMessages.SUCCESS,
						finalData: { cartProductDetails: tempCartProductDetails },
					});
				});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		}).catch((err) => {
			reject({
				response: ResponseMessages.SERVER_ERROR,
				finalData: {},
			});
		});
	}

	async getAdminProducts(payload) {
		const common = new Common();
		return new Promise((resolve, reject) => {
			try {
				const pageIndex = payload.pageIndex * payload.pageSize;
				Products.findAll({
					where: {},
					include: [
						{ model: Categories, attributes: ['id', 'name'] },
						{ model: SubCategories, attributes: ['id', 'name'] },
						{
							model: ProductPrice,
							attributes: [
								'id',
								'actual_price',
								'discount',
								'discount_type',
								'discount_start_date',
								'discount_end_date',
							],
						},
					],
					attributes: ['id', 'name', 'image', 'max_quantity'],
					limit: payload.pageSize,
					offset: pageIndex,
				}).then(async (products) => {
					let productsList = [];
					for (const product of products) {
						let productObj = {};
						const productPrice = product.product_price;

						let discountDetails;

						if (productPrice.discount) {
							discountDetails = common.calculateDiscountPrice(
								productPrice.discount_start_date,
								productPrice.discount_end_date,
								productPrice.discount,
								productPrice.actual_price,
								productPrice.discount_type
							);
						}

						productObj['id'] = product.id;
						productObj['image'] = product.image;
						productObj['max_quantity'] = product.max_quantity;
						productObj['name'] = product.name;
						productObj['actual_price'] = productPrice.actual_price;
						productObj['discount_price'] = productPrice.discount
							? discountDetails.discountPrice
							: 0.0;
						productObj['discount_status'] = productPrice.discount
							? discountDetails.discountStatus
							: null;
						productObj['category_name'] = product.category.name;
						productObj['sub_category_name'] = product.sub_category?.name;
						productsList.push(productObj);
					}

					let totalProductsCount = await Products.findAndCountAll({
						where: { is_deleted: 0 },
					});

					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: {
							products: productsList,
							totalProductsCount: totalProductsCount.count,
						},
					});
				});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async addNewProduct(payload) {
		return new Promise((resolve, reject) => {
			try {
				let data = {
					name: payload.name,
					image: payload.productImage,
					category_id: payload.category,
					sub_category_id:
						payload.sub_category == 0 ? null : payload.subCategory,
					max_quantity: payload.productStock,
					purchase_limit: payload.purchaseLimit,
					measuring_unit_id: payload.measuringUnit,
					pre_selected_quantity: 0,
					description: payload.description,
					is_active: 1,
					price_id: null,
				};

				Products.create({
					name: payload.name,
					image: payload.productImage,
					category_id: payload.category,
					sub_category_id:
						payload.subCategory == 0 ? null : payload.subCategory,
					max_quantity: payload.productStock,
					purchase_limit: payload.purchaseLimit,
					measuring_unit_id: payload.measuringUnit,
					pre_selected_quantity: 0,
					description: payload.description,
					is_active: 1,
					price_id: null,
				})
					.then(async (newProduct) => {
						const productPriceDetails = await ProductPrice.create({
							product_id: newProduct.id,
							actual_price: payload.unitPrice,
							discount: payload.discount ? payload.discount.amount : null,
							discount_type: payload.discount
								? payload.discount.type == 1
									? 'FLAT'
									: 'PERCENT'
								: null,
							discount_start_date: payload.discount
								? payload.discount.startDate
								: null,
							discount_end_date: payload.discount
								? payload.discount.endDate
								: null,
						});

						await Products.update(
							{ price_id: productPriceDetails.id },
							{ where: { id: newProduct.id } }
						);
						resolve({
							response: ResponseMessages.CREATE_NEW_PRODUCT,
							finalData: {},
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}
}
