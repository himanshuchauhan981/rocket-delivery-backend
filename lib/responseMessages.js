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
};
