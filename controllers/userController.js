import ResponseManager from '../lib/responseManager.js';
import UserHandler from '../handlers/userHandler.js';

export default class UserController extends UserHandler {
	responseManager;
	constructor() {
		super();
		this.responseManager = new ResponseManager();
	}

	login = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.login(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	signup = async (req, res) => {
		try {
			let payload = req.body;
			let response = await super.signup(payload);
			this.responseManager.sendSuccessResponse(response, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	forgetPassword = async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await super.forgetPassword(payload);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	verifyOTP = async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await super.verifyOTP(payload);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	};

	updateUserPassword = async (req, res) => {
		try {
			let payload = req.body;
			let responseDetails = await super.updateUserPassword(payload);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	viewUserDetails = async (req, res) => {
		try {
			let userDetails = req.user;
			let responseDetails = await super.viewUserDetails(userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};

	updateUserDetails = async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseDetails = await super.updateUserDetails(payload, userDetails);
			this.responseManager.sendSuccessResponse(responseDetails, res);
		} catch (err) {
			this.responseManager.sendErrorResponse(err, res);
		}
	};
}
