const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { connection } = require('../db');
const { responseMessages } = require('../lib');
const {
	Categories,
	SubCategories,
	Products,
	ProductPrice,
	MeasuringUnits,
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
		try {
			let cartItems = payload.cartItems;
			let productIds = cartItems.map((items) => items.id);
			let sqlQuery =
				'SELECT p.id,p.name,p.image,pp.actualPrice as price,pp.discountPercent,pp.discountStartDate, pp.discountEndDate,p.maxQuantity,p.status from products p join product_price pp on pp.productId = p.id where p.id IN (?)';
			let cartProductDetails = await connection.executeQuery(sqlQuery, [
				productIds,
			]);
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

			return {
				response: { STATUS_CODE: 200, MSG: 'Success' },
				finalData: { cartProductDetails: tempCartProductDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	getProductOffers: async () => {
		try {
			let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
			let productOffersQuery =
				'SELECT p.id, p.name, pp.actualPrice, pp.discountPercent,pp.discountEndDate, p.image from products p join product_price pp on pp.productId = p.id where pp.discountStartDate <= ? and pp.discountEndDate >= ? and discountPercent != ? LIMIT 4';
			let productDetails = await connection.executeQuery(productOffersQuery, [
				currentDate,
				currentDate,
				'null',
			]);

			for (let i = 0; i < productDetails.length; i++) {
				let discountPrice =
					(productDetails[i].discountPercent / 100) *
					productDetails[i].actualPrice;
				discountPrice = productDetails[i].actualPrice - discountPrice;
				productDetails[i].discountPrice = discountPrice;
			}

			return {
				response: responseMessages.SUCCESS,
				finalData: { productDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	addToProductHistory: async (payload, userDetails) => {
		try {
			let existingProductHistoryQuery =
				'SELECT id from product_history where userId = ? and productId = ?';
			let existingProductHistory = await connection.executeQuery(
				existingProductHistoryQuery,
				[payload.productId, userDetails.id]
			);

			if (existingProductHistory.length === 0) {
				let productHistoryQuery =
					'INSERT into product_history (userId,productId) VALUES (?,?)';
				await connection.executeQuery(productHistoryQuery, [
					userDetails.id,
					payload.productId,
				]);
			}

			return { response: responseMessages.SUCCESS, finalData: {} };
		} catch (err) {
			throw err;
		}
	},

	viewUserProductHistory: async (userDetails) => {
		try {
			let userProductHistoryQuery =
				'SELECT ph.id, ph.productId, p.image, p.name, pp.actualPrice as price, pp.discountPercent, pp.discountStartDate, pp.discountEndDate from product_history ph join products p on p.id = ph.productId join product_price pp on pp.productId = p.id where ph.userId = ? and ph.isDeleted = ?';

			let userProductHistory = await connection.executeQuery(
				userProductHistoryQuery,
				[userDetails.id, 0]
			);

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

			return {
				response: responseMessages.SUCCESS,
				finalData: { userProductHistory },
			};
		} catch (err) {
			throw err;
		}
	},

	removeFromProductHistory: async (payload) => {
		try {
			let existingProductHistoryQuery =
				'SELECT id from product_history where id = ?';
			let existingProductHistory = await connection.executeQuery(
				existingProductHistoryQuery,
				[payload.productHistoryId]
			);

			if (existingProductHistory && existingProductHistory.length > 0) {
				let updateProductHistoryQuery =
					'UPDATE product_history SET isDeleted = ? where id = ?';
				await connection.executeQuery(updateProductHistoryQuery, [
					1,
					payload.productHistoryId,
				]);

				return { response: responseMessages.SUCCESS, finalData: {} };
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = productHandler;
