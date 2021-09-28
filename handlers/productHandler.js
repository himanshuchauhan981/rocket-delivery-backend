const { connection } = require('../db');
const moment = require('moment');
const { responseMessages } = require('../lib');

const productHandler = {
	getHomeCategories: async () => {
		try {
			let sqlQuery =
				'SELECT id,name,image,isSubCategory FROM categories WHERE status = ?';
			let categoryDetails = await connection.executeQuery(sqlQuery, ['ACTIVE']);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { categoryDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	getSubCategoryItems: async (payload) => {
		try {
			let sqlQuery =
				'SELECT sc.id,sc.name,sc.image,c.name as categoryName FROM sub_categories sc join categories c on c.id = sc.categoryId WHERE sc.categoryId = ? and sc.status = ?';
			let subCategoryDetails = await connection.executeQuery(sqlQuery, [
				payload.categoryId,
				'ACTIVE',
			]);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { subCategoryDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	getProducts: async (payload) => {
		try {
			let sqlQuery;
			if (payload.subCategoryId) {
				sqlQuery = `SELECT p.id, p.name, p.image,pp.actualPrice as price, p.maxQuantity, p.purchaseLimit,sc.name as subCategoryName,mu.symbol FROM products p join 
							sub_categories sc on sc.id = p.subCategoryId join measuring_units mu on mu.id = p.measuring_unit join product_price pp on pp.productId = p.id WHERE p.subCategoryId = ? and p.status = ?`;
			} else {
				sqlQuery = `SELECT p.id, p.name, p.image,p.image, pp.actualPrice as price, p.maxQuantity, p.purchaseLimit,c.name as subCategoryName, mu.symbol FROM products p join categories c on p.categoryId = c.id join measuring_units mu on mu.id = p.measuring_unit join product_price pp on pp.productId = p.id WHERE p.categoryId = ? AND p.status = ?`;
			}

			let products = await connection.executeQuery(sqlQuery, [
				payload.subCategoryId ? payload.subCategoryId : payload.categoryId,
				'ACTIVE',
			]);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { products },
			};
		} catch (err) {
			throw err;
		}
	},

	getProductDetails: async (payload) => {
		try {
			let sqlQuery =
				'SELECT p.name,p.image,p.maxQuantity,p.purchaseLimit,pp.actualPrice as price,pp.discountPercent,pp.discountStartDate, pp.discountEndDate, p.description FROM products p join product_price pp on pp.productId = p.id WHERE p.id = ? ';

			let productDetails = await connection.executeQuery(sqlQuery, [
				payload.productId,
			]);

			let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

			for (let i = 0; i < productDetails.length; i++) {
				let discountStartDate = moment(
					productDetails[i].discountStartDate
				).format('YYYY-MM-DD HH:mm:ss');

				let discountEndDate = moment(productDetails[i].discountEndDate).format(
					'YYYY-MM-DD HH:mm:ss'
				);

				if (
					discountStartDate <= currentDate &&
					discountEndDate >= currentDate
				) {
					productDetails[i].discountStatus = true;
					let discountPrice =
						(productDetails[i].discountPercent / 100) * productDetails[i].price;
					discountPrice = productDetails[i].price - discountPrice;
					productDetails[i].discountPrice = discountPrice;
				} else {
					productDetails[i].discountStatus = false;
				}
			}

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { productDetails: productDetails[0] },
			};
		} catch (err) {
			throw err;
		}
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
				'SELECT p.id, p.name, pp.actualPrice, pp.discountPercent, p.image from products p join product_price pp on pp.productId = p.id where pp.discountStartDate <= ? and pp.discountEndDate >= ? and discountPercent != ? LIMIT 4';
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
};

module.exports = productHandler;
