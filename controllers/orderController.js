const { responseManager } = require('../lib');
const { orderHandler } = require('../handlers');

const orderController = {
	generateNewOrder: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await orderHandler.generateNewOrder(payload, userDetails);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	addToWishlist: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseDetails = await orderHandler.addToWishlist(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
	viewUserWishlist: async (req, res) => {
		try {
			let userDetails = req.user;
			let responseDetails = await orderHandler.viewUserWishlist(userDetails);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
	updateUserWishlist: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.body;

			let responseDetails = await orderHandler.updateUserWishlist(
				userDetails,
				payload
			);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getUserOrders: async (req, res) => {
		try {
			let userDetails = req.user;

			let responseDetails = await orderHandler.getUserOrders(userDetails);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = orderController;
