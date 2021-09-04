const { responseManager } = require('../lib');

const schemaValidator = (schema) => {
	return async (req, res, next) => {
		let validationResult;
		if (schema.body) validationResult = await schema.body.validate(req.body);
		else if (schema.query)
			validationResult = await schema.query.validate(req.query);
		else validationResult = await schema.params.validate(req.params);

		if (validationResult.error) {
			let message = validationResult.error.details[0].message.replace(/"/g, '');
			responseManager.sendJOIResponse(message, res);
		} else {
			next();
		}
	};
};

module.exports = schemaValidator;
