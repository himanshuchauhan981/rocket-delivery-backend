import CategoryHandler from '../handlers/categoryHandler.js';
import ResponseManager from '../lib/responseManager.js';

class CategoryController extends CategoryHandler {
	responseManager;

	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	createNewCategory = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.createNewCategory(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	changeCategoryStatus = async (req, res) => {
		try {
			const params = req.params;
			const payload = req.body;
			const response = await super.changeCategoryStatus(params, payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	deleteCategory = async (req, res) => {
		try {
			const payload = req.body;
			const response = await super.deleteCategory(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default CategoryController;
