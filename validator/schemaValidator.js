const Joi = require('joi');

module.exports = {
	ADD_NEW_ADDRESS: {
		body: Joi.object({
			fullName: Joi.string().required(),
			mobileNumber: Joi.string().required().length(10),
			houseNo: Joi.string().required(),
			area: Joi.string().required(),
			pinCode: Joi.string().required(),
			landmark: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			countryCode: Joi.string().required(),
			latitude: Joi.string().required(),
			longitude: Joi.string().required(),
		}),
	},
	ADD_NEW_WISHLIST_ITEM: {
		body: Joi.object({
			productId: Joi.number().required(),
		}),
	},
};
