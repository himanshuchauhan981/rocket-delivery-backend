import ResponseManager from '../lib/responseManager.js';
import SubCategoryHandler from '../handlers/subCategoryHandler.js';

export default class SubCategoryController extends SubCategoryHandler {
	responseManager;
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	findAll = async (req, res) => {
		try {
			const response = await super.findAll();

			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}
