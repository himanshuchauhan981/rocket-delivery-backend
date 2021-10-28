import UserController from '../controllers/userController.js';

export default class UserRoute {
	async initiateUserRoutes(apiRouter) {
		apiRouter.post('/login', UserController.prototype.login);

		return apiRouter;
	}
}
