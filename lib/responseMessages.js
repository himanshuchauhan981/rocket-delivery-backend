module.exports = {
	DB_ERROR: {
		STATUS_CODE: 500,
		MSG: 'Some error is caused in db',
	},
	JOI_ERROR: {
		STATUS_CODE: 500,
		TYPE: 'Joi eror',
	},
	INSUFFICIENT_QUANTITY: {
		STATUS_CODE: 400,
		MSG: '{{productName}} is out of stock',
	},
};
