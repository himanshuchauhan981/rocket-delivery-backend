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
		STATUS_CODE: 200,
		MSG: 'Product is out of stock',
	},
	EXISTING_WISHLIST_ITEM: {
		STATUS_CODE: 400,
		MSG: 'Product is already in wishlist',
	},
	NEW_WISHLIST_ITEM: {
		STATUS_CODE: 200,
		MSG: 'Product is added in wishlist',
	},
	REMOVE_WISHLIST_ITEM: {
		STATUS_CODE: 200,
		MSG: 'Product has been removed from wishlist',
	},
	SUCCESS: {
		STATUS_CODE: 200,
		MSG: 'Success',
	},
	EXISTED_USER: {
		STATUS_CODE: 409,
		MSG: 'User already existed',
	},
	UPDATED_USER_DETAILS: {
		STATUS_CODE: 200,
		MSG: 'Account details updated successfully',
	},
	INVALID_EMAIL_PASSWORD: {
		STATUS_CODE: 401,
		MSG: 'Invalid email or passsword',
	},
	NEW_ADDRESS: {
		STATUS_CODE: 200,
		MSG: 'New address saved',
	},
	EXISTING_USER_EMAIL: {
		STATUS_CODE: 200,
		MSG: 'Email already existed',
	},
	ORDER_CANCELLED: {
		STATUS_CODE: 200,
		MSG: 'Order has been cancelled successfully',
	},
	RESET_PASSWORD_SUCCESS: {
		STATUS_CODE: 200,
		MSG: 'Email has been successfully sent',
	},

	VERIFIED_OTP: {
		STATUS_CODE: 200,
		MSG: 'OTP has been verified',
	},

	INVALID_OTP: {
		STATUS_CODE: 400,
		MSG: 'The OTP you entered is invalid. Please enter the correct OTP.',
	},

	NON_EXISTED_EMAIL: {
		STATUS_CODE: 400,
		MSG: "Couldn't find your account",
	},
};
