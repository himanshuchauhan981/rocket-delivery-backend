import ResponseMessages from './responseMessages.js';

export default class ResponseManager {
	async sendErrorResponse(errData, res) {
		const response = {
			status: errData.response.STATUS_CODE,
			data: { msg: errData.response.MSG },
		};

		res.status(response.status).send(response.data);
	}

	async sendSuccessResponse(data, res) {
		const response = {
			status: data.response.STATUS_CODE,
			data: { msg: data.response.MSG, ...data.finalData },
		};
		res.status(response.status).send(response.data);
	}

	async sendJOIResponse(msg, res) {
		let response = {
			status: ResponseMessages.JOI_ERROR.STATUS_CODE,
			data: { msg, type: ResponseMessages.JOI_ERROR.TYPE },
		};

		res.status(response.status).send(response.data);
	}
}
