// const { productHandler } = require('../handlers');
// const { responseManager } = require('../lib');

import ProductHandler from '../handlers/productHandler.js';
import ResponseManager from '../lib/responseManager.js';

export default class ProductController extends ProductHandler {
	responseManager;
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	addToProductHistory = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await super.addToProductHistory(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	viewUserProductHistory = async (req, res) => {
		try {
			let userDetails = req.user;
			let response = await super.viewUserProductHistory(userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	removeFromProductHistory = async (req, res) => {
		try {
			let payload = req.body;

			let response = await super.removeFromProductHistory(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getDiscountOffers = async (req, res) => {
		try {
			let response = await productHandler.getDiscountOffers();
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	};

	getProductOffers = async (req, res) => {
		try {
			let userDetails = req.user;

			let response = await productHandler.getProductOffers(userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

// const productController = {
// 	getHomeCategories: async (req, res) => {
// 		try {
// 			let response = await productHandler.getHomeCategories();
// 			responseManager.sendSuccessResponse(response, res);
// 		} catch (err) {
// 			responseManager.sendErrorResponse(err, res);
// 		}
// 	},

// 	getSubCategoryItems: async (req, res) => {
// 		try {
// 			let payload = req.query;
// 			let response = await productHandler.getSubCategoryItems(payload);
// 			responseManager.sendSuccessResponse(response, res);
// 		} catch (err) {
// 			responseManager.sendErrorResponse(err, res);
// 		}
// 	},

// 	getProducts: async (req, res) => {
// 		try {
// 			let payload = req.query;
// 			let response = await productHandler.getProducts(payload);
// 			responseManager.sendSuccessResponse(response, res);
// 		} catch (err) {
// 			responseManager.sendErrorResponse(err, res);
// 		}
// 	},

// 	getProductDetails: async (req, res) => {
// 		try {
// 			let payload = req.query;
// 			let response = await productHandler.getProductDetails(payload);
// 			responseManager.sendSuccessResponse(response, res);
// 		} catch (err) {
// 			responseManager.sendErrorResponse(err, res);
// 		}
// 	},

// 	getCartProductDetails: async (req, res) => {
// 		try {
// 			let payload = req.body;
// 			let response = await productHandler.getCartProductDetails(payload);
// 			responseManager.sendSuccessResponse(response, res);
// 		} catch (err) {
// 			responseManager.sendErrorResponse(err, res);
// 		}
// 	},

// module.exports = productController;
