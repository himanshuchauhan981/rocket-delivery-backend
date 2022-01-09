import MeasuringUnitHandler from '../handlers/measuringUnitHandler.js';
import ResponseManager from '../lib/responseManager.js';

class MeasuringUnitController extends MeasuringUnitHandler {
	responseManager;

	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	list = async (req, res) => {
		try {
			let response = await super.list();
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default MeasuringUnitController;
