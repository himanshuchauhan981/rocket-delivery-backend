import AdminHandler from '../handlers/adminHandler.js';
import ResponseManager from '../lib/responseManager.js';

class AdminController extends AdminHandler {
	responseManager;

	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	loginAdmin = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.loginAdmin(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	adminCategories = async (req, res) => {
		try {
			const payload = req.query;
			const response = await super.adminCategories(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	addNewImage = async (req, res) => {
		try {
			const payload = req.body;
			const response = await super.addNewImage(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default AdminController;
