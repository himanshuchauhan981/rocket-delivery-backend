import Joi from 'joi';

const SchemaValidator = {
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
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},
	SIGNUP: {
		body: Joi.object({
			name: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
			countryCode: Joi.string().required(),
			type: Joi.string().required(),
			mobileNo: Joi.string().required(),
		}),
	},
	LOGIN: {
		body: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required(),
			fcm_token: Joi.string().required(),
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
		params: Joi.object({
			orderId: Joi.string().required(),
		}),
	},
	UPDATE_USER_DETAILS: {
		body: Joi.object({
			email: Joi.string().optional().allow(''),
			name: Joi.string().optional(),
			touchedEmail: Joi.boolean().optional(),
			newPassword: Joi.string().optional(),
			profileImage: Joi.string().optional(),
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

	RAZORPAY_ORDER: {
		query: Joi.object({
			amount: Joi.string().required(),
		}),
	},

	CHANGE_CATEGORY_STATUS: {
		params: Joi.object({
			categoryId: Joi.number().required(),
		}),
		body: Joi.object({
			status: Joi.boolean().required(),
		}),
	},

	LIST_CATEGORIES: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
		}),
	},
	GET_CATEGORY_DETAILS: {
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},

	NEW_CATEGEORY: {
		body: Joi.object({
			name: Joi.string().required(),
			image: Joi.string().required(),
		}),
	},

	UPDATE_CATEGORY: {
		body: Joi.object({
			id: Joi.number().required(),
			name: Joi.string().required(),
			image: Joi.string().required(),
		}),
	},

	CART_ITEMS: {
		body: Joi.object({
			cartItems: Joi.array().items(
				Joi.object().keys({
					id: Joi.number().required(),
					quantity: Joi.number().required(),
				})
			),
			removeCartItem: Joi.boolean().required(),
		}),
	},

	CATEGORY_LISTING: {
		query: Joi.object({
			limit: Joi.number().required(),
		}),
	},

	CATALOGUE_IMAGE_LISTING: {
		query: Joi.object({
			type: Joi.string().required(),
		}),
	},

	ADMIN_PRODUCTS_LISTING: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
			sort: Joi.number().required(),
			search: Joi.string().required().allow(''),
		}),
	},

	DELETE_PRODUCTS: {
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},

	GET_PRODUCT_DETAILS: {
		params: Joi.object({
			id: Joi.number().required(),
		}),
	},

	ADD_NEW_PRODUCT: {
		body: Joi.object({
			category: Joi.number().required(),
			subCategory: Joi.number().optional(),
			description: Joi.string().required(),
			image: Joi.number().required(),
			measuringUnit: Joi.number().required(),
			paymentMethod: Joi.number().required(),
			name: Joi.string().required(),
			productStock: Joi.string().required(),
			purchaseLimit: Joi.string().required(),
			unitPrice: Joi.number().required(),
		}),
	},
};

export default SchemaValidator;