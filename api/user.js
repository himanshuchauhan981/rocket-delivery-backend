import UserController from '../controllers/userController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';

export default class UserRoute {
	async initiateUserRoutes(apiRouter) {
		let userController = new UserController();
		let schemaMiddleware = new SchemaMiddleware();

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

		return apiRouter;
	}
}
