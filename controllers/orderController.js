// const { responseManager } = require('../lib');
// const { orderHandler } = require('../handlers');

import OrderHandler from '../handlers/orderHandler.js';
import ResponseManager from '../lib/responseManager.js';

class OrderController extends OrderHandler {
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	generateNewOrder = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await super.generateNewOrder(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	getUserOrders = async (req, res) => {
		try {
			let userDetails = req.user;

			let responseDetails = await super.getUserOrders(userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	specificOrderDetails = async (req, res) => {
		try {
			let payload = req.query;

			let responseDetails = await super.specificOrderDetails(payload);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	changeOrderStatus = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;

			let responseDetails = await super.changeOrderStatus(payload, userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default OrderController;

// addToWishlist = async (req, res) => {
// 	try {
// 		let payload = req.body;
// 		let userDetails = req.user;
// 		let responseDetails = await orderHandler.addToWishlist(
// 			payload,
// 			userDetails
// 		);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };
// viewUserWishlist = async (req, res) => {
// 	try {
// 		let userDetails = req.user;
// 		let responseDetails = await orderHandler.viewUserWishlist(userDetails);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };
// updateUserWishlist = async (req, res) => {
// 	try {
// 		let userDetails = req.user;
// 		let payload = req.body;

// 		let responseDetails = await orderHandler.updateUserWishlist(
// 			userDetails,
// 			payload
// 		);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };

// getUserOrders = async (req, res) => {
// 	try {
// 		let userDetails = req.user;

// 		let responseDetails = await orderHandler.getUserOrders(userDetails);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };

// specificOrderDetails = async (req, res) => {
// 	try {
// 		let payload = req.query;

// 		let responseDetails = await orderHandler.specificOrderDetails(payload);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };

// changeOrderStatus = async (req, res) => {
// 	try {
// 		let payload = req.body;
// 		let userDetails = req.user;

// 		let responseDetails = await orderHandler.changeOrderStatus(
// 			payload,
// 			userDetails
// 		);
// 		this.responseManager.sendSuccessResponse(responseDetails, res);
// 	} catch (err) {
// 		this.responseManager.sendErrorResponse(err, res);
// 	}
// };
