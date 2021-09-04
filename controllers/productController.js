const { productHandler } = require('../handlers');
const { responseManager } = require('../lib');

const productController = {
	getHomeCategories: async (req, res) => {
		try {
			let response = await productHandler.getHomeCategories();
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getSubCategoryItems: async (req, res) => {
		try {
			let payload = req.query;
			let response = await productHandler.getSubCategoryItems(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getProducts: async (req, res) => {
		try {
			let payload = req.query;
			let response = await productHandler.getProducts(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getProductDetails: async (req, res) => {
		try {
			let payload = req.query;
			let response = await productHandler.getProductDetails(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getCartProductDetails: async (req, res) => {
		try {
			let payload = req.query;
			let response = await productHandler.getCartProductDetails(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = productController;
