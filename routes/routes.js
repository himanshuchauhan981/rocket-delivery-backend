const express = require('express');

const {
	productController,
	userController,
	orderController,
} = require('../controllers');
const { authMiddleware, schemaMiddleware } = require('../middlewares');
const { schemaValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.get('/homeCategories', productController.getHomeCategories);

	router.get(
		'/subCategory',
		schemaMiddleware(schemaValidator.GET_SUB_CATEGORY_ITEMS),
		productController.getSubCategoryItems
	);

	router.get(
		'/products',
		schemaMiddleware(schemaValidator.GET_PRODUCTS),
		productController.getProducts
	);

	router.get(
		'/product',
		schemaMiddleware(schemaValidator.PRODUCT_DETAILS),
		productController.getProductDetails
	);

	router.post(
		'/signup',
		schemaMiddleware(schemaValidator.SIGNUP),
		userController.createNewUser
	);

	router.post(
		'/login',
		schemaMiddleware(schemaValidator.LOGIN),
		userController.loginExistingUser
	);

	router.post('/cartProductDetails', productController.getCartProductDetails);

	router.post(
		'/addNewAddress',
		schemaMiddleware(schemaValidator.ADD_NEW_ADDRESS),
		authMiddleware,
		userController.addNewAddress
	);

	router.get('/viewAddress', authMiddleware, userController.viewUserAddress);

	router.post(
		'/generateOrder',
		authMiddleware,
		orderController.generateNewOrder
	);

	router.post(
		'/addToWishlist',
		schemaMiddleware(schemaValidator.ADD_NEW_WISHLIST_ITEM),
		authMiddleware,
		orderController.addToWishlist
	);

	router.get('/viewWishlist', authMiddleware, orderController.viewUserWishlist);

	router.post(
		'/updateUserWishlist',
		schemaMiddleware(schemaValidator.UPDATE_USER_WISHLIST),
		authMiddleware,
		orderController.updateUserWishlist
	);

	return router;
};
