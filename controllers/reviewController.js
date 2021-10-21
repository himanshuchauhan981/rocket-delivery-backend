const { responseManager } = require('../lib');
const { reviewHandler } = require('../handlers');

const ratingController = {
	saveNewReview: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await reviewHandler.saveNewReview(payload, userDetails);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateReview: async (req, res) => {
		try {
			let payload = req.body;
			let response = await reviewHandler.updateReview(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	deleteReview: async (req, res) => {
		try {
			let payload = req.body;
			let response = await reviewHandler.deleteReview(payload);
			responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = ratingController;
