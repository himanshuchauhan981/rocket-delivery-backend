import express from 'express';

import UserController from '../controllers/userController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import ProductController from '../controllers/productController.js';

export default class UserRoute {
	async initiateUserRoutes() {
		const apiRouter = express.Router();
		const userController = new UserController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();
		const productController = new ProductController();

		apiRouter.post(
			'/login',
			schemaMiddleware.validateSchema(SchemaValidator.LOGIN),
			userController.login
		);
		apiRouter.post(
			'/signup',
			schemaMiddleware.validateSchema(SchemaValidator.SIGNUP),
			userController.signup
		);
		apiRouter.post(
			'/forgetPassword',
			schemaMiddleware.validateSchema(SchemaValidator.FORGET_PASSWORD),
			userController.forgetPassword
		);

		apiRouter.post(
			'/verifyOTP',
			schemaMiddleware.validateSchema(SchemaValidator.VERIFY_OTP),
			userController.verifyOTP
		);

		apiRouter.patch(
			'/updatePassword',
			schemaMiddleware.validateSchema(SchemaValidator.UPDATE_PASSWORD),
			userController.updateUserPassword
		);

		apiRouter.get(
			'/user',
			authMiddleware.apiAuth,
			userController.viewUserDetails
		);

		apiRouter.patch(
			'/user',
			schemaMiddleware.validateSchema(SchemaValidator.UPDATE_USER_DETAILS),
			authMiddleware.apiAuth,
			userController.updateUserDetails
		);

		apiRouter.get(
			'/homeCategories',
			schemaMiddleware.validateSchema(SchemaValidator.CATEGORY_LISTING),
			productController.getHomeCategories
		);

		apiRouter.get(
			'/subCategory',
			schemaMiddleware.validateSchema(SchemaValidator.GET_SUB_CATEGORY_ITEMS),
			productController.getSubCategoryItems
		);

		apiRouter.post(
			'/cart',
			schemaMiddleware.validateSchema(SchemaValidator.CART_ITEMS),
			productController.getCartProductDetails
		);

		return apiRouter;
	}
}
