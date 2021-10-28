import UserController from '../controllers/userController.js';

export default class UserRoute {
	async initiateUserRoutes(apiRouter) {
		let userController = new UserController();

		apiRouter.post('/login', userController.login);

		return apiRouter;
	}
}
