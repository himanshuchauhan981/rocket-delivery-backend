import express from 'express';
import UserRoute from './user.js';

export default class Routes extends UserRoute {
	apiRouter;
	static async prepareRoutes(app) {
		this.apiRouter = express.Router();

		let userRoutes = new UserRoute();

		const userAPI = await userRoutes.initiateUserRoutes(this.apiRouter);
		app.use('/', userAPI);
	}
}
// const express = require('express');

// const {
// 	productController,
// 	userController,
// 	orderController,
// 	paymentController,
// 	reviewController,
// } = require('../controllers');
// const { authMiddleware, schemaMiddleware } = require('../middlewares');
// const { schemaValidator } = require('../validator');

// module.exports = () => {
// 	const router = express.Router();

// 	router.get('/homeCategories', productController.getHomeCategories);

// 	router.get(
// 		'/subCategory',
// 		schemaMiddleware(schemaValidator.GET_SUB_CATEGORY_ITEMS),
// 		productController.getSubCategoryItems
// 	);

// 	router.get(
// 		'/products',
// 		schemaMiddleware(schemaValidator.GET_PRODUCTS),
// 		productController.getProducts
// 	);

// 	router.get(
// 		'/product',
// 		schemaMiddleware(schemaValidator.PRODUCT_DETAILS),
// 		productController.getProductDetails
// 	);

// 	router.post(
// 		'/signup',
// 		schemaMiddleware(schemaValidator.SIGNUP),
// 		userController.createNewUser
// 	);

// 	router.post(
// 		'/login',
// 		schemaMiddleware(schemaValidator.LOGIN),
// 		userController.loginExistingUser
// 	);

// 	router.post('/cartProductDetails', productController.getCartProductDetails);

// 	router.post(
// 		'/addNewAddress',
// 		schemaMiddleware(schemaValidator.ADD_NEW_ADDRESS),
// 		authMiddleware,
// 		userController.addNewAddress
// 	);

// 	router.patch(
// 		'/editAddress',
// 		schemaMiddleware(schemaValidator.EDIT_ADDRESS),
// 		authMiddleware,
// 		userController.editAddress
// 	);

// 	router.get('/viewAddress', authMiddleware, userController.viewUserAddress);

// 	router.post(
// 		'/generateOrder',
// 		authMiddleware,
// 		orderController.generateNewOrder
// 	);

// 	router.post(
// 		'/addToWishlist',
// 		schemaMiddleware(schemaValidator.ADD_NEW_WISHLIST_ITEM),
// 		authMiddleware,
// 		orderController.addToWishlist
// 	);

// 	router.get('/viewWishlist', authMiddleware, orderController.viewUserWishlist);

// 	router.post(
// 		'/updateUserWishlist',
// 		schemaMiddleware(schemaValidator.UPDATE_USER_WISHLIST),
// 		authMiddleware,
// 		orderController.updateUserWishlist
// 	);

// 	router.get('/userOrders', authMiddleware, orderController.getUserOrders);

// 	router.get(
// 		'/order',
// 		authMiddleware,
// 		schemaMiddleware(schemaValidator.SPECIFIC_ORDER_DETAILS),
// 		orderController.specificOrderDetails
// 	);

// 	router.get('/userDetails', authMiddleware, userController.viewUserDetails);

// 	router.patch(
// 		'/updateUserDetails',
// 		authMiddleware,
// 		schemaMiddleware(schemaValidator.UPDATE_USER_DETAILS),
// 		userController.updateUserDetails
// 	);

// 	router.patch(
// 		'/order/changeStatus',
// 		schemaMiddleware(schemaValidator.CHANGE_ORDER_STATUS),
// 		authMiddleware,
// 		orderController.changeOrderStatus
// 	);

// 	router.post(
// 		'/forgetPassword',
// 		schemaMiddleware(schemaValidator.FORGET_PASSWORD),
// 		userController.forgetPassword
// 	);

// 	router.post(
// 		'/verifyOTP',
// 		schemaMiddleware(schemaValidator.VERIFY_OTP),
// 		userController.verifyOTP
// 	);

// 	router.patch(
// 		'/updatePassword',
// 		schemaMiddleware(schemaValidator.UPDATE_PASSWORD),
// 		userController.updateUserPassword
// 	);

// 	router.get('/discountOffers', productController.getDiscountOffers);

// 	router.post(
// 		'/addToHistory',
// 		schemaMiddleware(schemaValidator.ADD_TO_PRODUCT_HISTORY),
// 		authMiddleware,
// 		productController.addToProductHistory
// 	);

// 	router.get(
// 		'/viewHistory',
// 		authMiddleware,
// 		productController.viewUserProductHistory
// 	);

// 	router.delete(
// 		'/removeProductHistory',
// 		schemaMiddleware(schemaValidator.REMOVE_PRODUCT_HISTORY),
// 		authMiddleware,
// 		productController.removeFromProductHistory
// 	);

// 	router.get(
// 		'/productOffers',
// 		authMiddleware,
// 		productController.getProductOffers
// 	);

// 	router.get(
// 		'/razorpay/order',
// 		authMiddleware,
// 		paymentController.createRazorpayOrder
// 	);

// 	router.post(
// 		'/review',
// 		schemaMiddleware(schemaValidator.ADD_NEW_REVIEW),
// 		authMiddleware,
// 		reviewController.saveNewReview
// 	);

// 	router.patch('/review', authMiddleware, reviewController.updateReview);

// 	router.delete(
// 		'/review',
// 		authMiddleware,
// 		schemaMiddleware(schemaValidator.DELETE_REVIEW),
// 		reviewController.deleteReview
// 	);

// 	return router;
// };
