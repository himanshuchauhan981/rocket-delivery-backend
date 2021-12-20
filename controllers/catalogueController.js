import CatalogueHandler from '../handlers/catalogueHandler.js';
import ResponseManager from '../lib/responseManager.js';

class CatalogueController extends CatalogueHandler {
	responseManager;

	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	getCatalogueImages = async (req, res) => {
		try {
			let payload = req.query;
			let response = await super.getCatalogueImages(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default CatalogueController;
