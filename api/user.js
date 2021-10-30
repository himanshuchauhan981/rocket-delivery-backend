import UserController from '../controllers/userController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

export default class UserRoute {
	async initiateUserRoutes(apiRouter) {
		let userController = new UserController();
		let schemaMiddleware = new SchemaMiddleware();
		let authMiddleware = new AuthMiddleware();

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

		return apiRouter;
	}
}
