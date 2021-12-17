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
			let response = await super.getDiscountOffers();
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getProductOffers = async (req, res) => {
		try {
			let userDetails = req.user;

			let response = await super.getProductOffers(userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getHomeCategories = async (req, res) => {
		try {
			let payload = req.query;
			let response = await super.getHomeCategories(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getCartProductDetails = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.getCartProductDetails(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getSubCategoryItems = async (req, res) => {
		try {
			let payload = req.query;
			let response = await super.getSubCategoryItems(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getProductDetails = async (req, res) => {
		try {
			let payload = req.params;
			let response = await super.getProductDetails(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getProducts = async (req, res) => {
		try {
			let payload = req.query;
			let response = await super.getProducts(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getAdminProducts = async (req, res) => {
		try {
			let payload = req.query;
			let response = await super.getAdminProducts(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	addNewProduct = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.addNewProduct(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}
