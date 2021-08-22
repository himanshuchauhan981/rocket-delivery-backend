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
};

module.exports = userController;
