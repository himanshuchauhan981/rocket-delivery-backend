const RESPONSE_MESSAGES = require('./responseMessages');

const responseManager = {
	sendErrorResponse: (errData, res) => {
		let response;
		console.log(errData);
		response = {
			status: errData.response.STATUS_CODE,
			data: { msg: errData.response.MSG },
		};

		res.status(response.status).send(response.data);
	},

	sendSuccessResponse: (data, res) => {
		let response = {
			status: data.response.STATUS_CODE,
			data: { msg: data.response.MSG, ...data.finalData },
		};
		res.status(response.status).send(response.data);
	},

	sendJOIResponse: (msg, res) => {
		let response = {
			status: RESPONSE_MESSAGES.JOI_ERROR.STATUS_CODE,
			data: { msg, type: RESPONSE_MESSAGES.JOI_ERROR.TYPE },
		};

		res.status(response.status).send(response.data);
	},
};

module.exports = responseManager;
