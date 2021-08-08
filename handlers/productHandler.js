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
};

module.exports = productHandler;
