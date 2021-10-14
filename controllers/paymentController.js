const { paymentHandler } = require('../handlers');
const { responseManager } = require('../lib');

const paymentController = {
	createRazorpayOrder: async (req, res) => {
		try {
			let payload = req.query;
			let userDetails = req.user;
			let response = await paymentHandler.createRazorpayOrder(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = paymentController;
