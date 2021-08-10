const { connection } = require('../db');

const productHandler = {
	getHomeCategories: async () => {
		try {
			let sqlQuery = 'SELECT id,name,image from categories where status = ?';
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
				'SELECT sc.id,sc.name,sc.image,c.name as categoryName from sub_categories sc join categories c on c.id = sc.categoryId where sc.categoryId = ? and sc.status = ?';
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
			let sqlQuery =
				'SELECT p.id, p.name, p.image,p.price, p.maxQuantity, p.purchaseLimit,sc.name as subCategoryName from products p join sub_categories sc on sc.id = p.subCategoryId where p.subCategoryId = ? and p.status = ?';
			let products = await connection.executeQuery(sqlQuery, [
				payload.subCategoryId,
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
};

module.exports = productHandler;
