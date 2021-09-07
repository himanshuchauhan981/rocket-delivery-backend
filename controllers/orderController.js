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
};

module.exports = orderController;
