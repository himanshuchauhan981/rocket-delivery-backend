import AddressHandler from '../handlers/addressHandler.js';
import ResponseManager from '../lib/responseManager.js';

class AddressController extends AddressHandler {
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	addNewAddress = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await this.save(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	editAddress = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await this.update(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	viewUserAddress = async (req, res) => {
		try {
			let userDetails = req.user;
			let response = await this.view(userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default AddressController;
