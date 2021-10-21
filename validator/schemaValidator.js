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
	UPDATE_USER_DETAILS: {
		body: Joi.object({
			email: Joi.string().optional().allow(''),
			name: Joi.string().optional(),
			touchedEmail: Joi.boolean().optional(),
			newPassword: Joi.string().optional(),
		}),
	},
	CHANGE_ORDER_STATUS: {
		body: Joi.object({
			orderId: Joi.number().required(),
			status: Joi.number().required(),
		}),
	},
	FORGET_PASSWORD: {
		body: Joi.object({
			email: Joi.string().required(),
		}),
	},
	VERIFY_OTP: {
		body: Joi.object({
			email: Joi.string().required(),
			otp: Joi.string().required(),
		}),
	},
	UPDATE_PASSWORD: {
		body: Joi.object({
			email: Joi.string().required(),
			newPassword: Joi.string().required(),
		}),
	},

	ADD_TO_PRODUCT_HISTORY: {
		body: Joi.object({
			productId: Joi.number().required(),
		}),
	},
	REMOVE_PRODUCT_HISTORY: {
		body: Joi.object({
			productHistoryId: Joi.number().required(),
		}),
	},
	EDIT_ADDRESS: {
		body: Joi.object({
			addressId: Joi.number().required(),
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

	GENERATE_ORDER: {
		body: Joi.object({}),
	},

	ADD_NEW_REVIEW: {
		body: Joi.object({
			orderId: Joi.number().required(),
			headline: Joi.string().required(),
			opinion: Joi.string().required(),
			reviewImages: Joi.array().optional(),
			productId: Joi.number().required(),
			ratings: Joi.number().required(),
		}),
	},
	DELETE_REVIEW: {
		body: Joi.object({
			reviewId: Joi.number().required(),
		}),
	},
};
