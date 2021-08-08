const { productHandler } = require('../handlers');
const { responseManger } = require('../lib');

const productController = {
	getHomeCategories: async (req, res) => {
		try {
			let response = await productHandler.getHomeCategories();
			responseManger.sendSuccessResponse(response, res);
		} catch (err) {
			responseManger.sendErrorResponse(err, res);
		}
	},
};

module.exports = productController;
