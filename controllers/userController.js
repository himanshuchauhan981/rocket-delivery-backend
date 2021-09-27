const { responseManager } = require('../lib');
const { userHandler } = require('../handlers');

const userController = {
	createNewUser: async (req, res) => {
		try {
			let payload = req.body;
			let response = await userHandler.createNewUser(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	loginExistingUser: async (req, res) => {
		try {
			let payload = req.body;
			let response = await userHandler.loginExistingUser(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	addNewAddress: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await userHandler.addNewAddress(payload, userDetails);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	viewUserAddress: async (req, res) => {
		try {
			let userDetails = req.user;
			let response = await userHandler.viewUserAddress(userDetails);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	viewUserDetails: async (req, res) => {
		try {
			let userDetails = req.user;
			let responseDetails = await userHandler.viewUserDetails(userDetails);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateUserDetails: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseDetails = await userHandler.updateUserDetails(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	forgetPassword: async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await userHandler.forgetPassword(payload);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	verifyOTP: async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await userHandler.verifyOTP(payload);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateUserPassword: async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await userHandler.updateUserPassword(payload);
			responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = userController;
