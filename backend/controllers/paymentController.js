import PaymentHandler from '../handlers/paymentHandlers.js';
import ResponseManager from '../lib/responseManager.js';

export default class PaymentController extends PaymentHandler {
	responseManager;
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	createRazorpayOrder = async (req, res) => {
		try {
			let payload = req.query;
			let userDetails = req.user;
			let response = await super.createRazorpayOrder(payload, userDetails);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}
