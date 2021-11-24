import express from 'express';
import AdminController from '../controllers/adminController.js';

class AdminRoute {
	async initiateAdminRoute() {
		const apiRouter = express.Router();
		const adminController = new AdminController();

		apiRouter.post('/login', adminController.loginAdmin);

		apiRouter.get('/categories', adminController.adminCategories);

		return apiRouter;
	}
}

export default AdminRoute;
