import ResponseManager from '../lib/responseManager.js';

export default class SchemaMiddleware {
	validateSchema(schema) {
		let responseManager = new ResponseManager();
		return async (req, res, next) => {
			let validationResult;
			if (schema.body) validationResult = await schema.body.validate(req.body);
			else if (schema.query)
				validationResult = await schema.query.validate(req.query);
			else validationResult = await schema.params.validate(req.params);
			if (validationResult.error) {
				let message = validationResult.error.details[0].message.replace(
					/"/g,
					''
				);
				responseManager.sendJOIResponse(message, res);
			} else {
				next();
			}
		};
	}
}
