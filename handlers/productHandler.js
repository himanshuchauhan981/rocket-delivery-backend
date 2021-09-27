const { connection } = require('../db');

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
				'SELECT p.name,p.image,p.maxQuantity,p.purchaseLimit,pp.actualPrice as price, p.description FROM products p join product_price pp on pp.productId = p.id WHERE p.id = ? ';

			let productDetails = await connection.executeQuery(sqlQuery, [
				payload.productId,
			]);

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
				'SELECT p.id,p.name,p.image,pp.actualPrice as price,p.maxQuantity,p.status from products p join product_price pp on pp.productId = p.id where p.id IN (?)';
			let cartProductDetails = await connection.executeQuery(sqlQuery, [
				productIds,
			]);
			let tempCartProductDetails = [];

			for (let i = 0; i < cartProductDetails.length; i++) {
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
};

module.exports = productHandler;
