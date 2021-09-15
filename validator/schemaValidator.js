const Joi = require('joi');

module.exports = {
	GET_SUB_CATEGORY_ITEMS: {
		query: Joi.object({
			categoryId: Joi.number().required(),
		}),
	},
	GET_PRODUCTS: {
		query: Joi.object({
			subCategoryId: Joi.number().optional(),
			categoryId: Joi.number().optional(),
		}),
	},
	PRODUCT_DETAILS: {
		query: Joi.object({
			productId: Joi.number().required(),
		}),
	},
	SIGNUP: {
		body: Joi.object({
			name: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
			countryCode: Joi.string().required(),
			type: Joi.string().required(),
			mobileNumber: Joi.string().required(),
		}),
	},
	LOGIN: {
		body: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
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
	UPDATE_USER_WISHLIST: {
		body: Joi.object({
			wishlistId: Joi.number().required(),
		}),
	},
	SPECIFIC_ORDER_DETAILS: {
		query: Joi.object({
			orderId: Joi.string().required(),
		}),
	},
};
