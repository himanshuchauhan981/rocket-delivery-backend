import WishlistHandler from '../handlers/wishlistHandler.js';
import ResponseManager from '../lib/responseManager.js';

class WishlistController extends WishlistHandler {
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	add = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseDetails = await super.add(payload, userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	view = async (req, res) => {
		try {
			let userDetails = req.user;
			let responseDetails = await super.view(userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	update = async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.body;

			let responseDetails = await super.update(userDetails, payload);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}

export default WishlistController;
