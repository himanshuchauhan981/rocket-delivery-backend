import ReviewHandler from '../handlers/reviewHandler.js';
import ResponseManager from '../lib/responseManager.js';

export default class ReviewController extends ReviewHandler {
	responseManager;
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}
	saveNewReview = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let response = await this.create(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	updateReview = async (req, res) => {
		try {
			let payload = req.body;
			let response = await this.update(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	deleteReview = async (req, res) => {
		try {
			let payload = req.body;
			let response = await this.delete(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}
