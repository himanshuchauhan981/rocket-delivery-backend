import express from 'express';

import AdminController from '../controllers/adminController.js';
import CategoryController from '../controllers/categoryController.js';

class AdminRoute {
	async initiateAdminRoute() {
		const apiRouter = express.Router();
		const adminController = new AdminController();
		const categoryController = new CategoryController();

		apiRouter.post('/login', adminController.loginAdmin);

		apiRouter.get('/categories', adminController.adminCategories);

		apiRouter.post('/category', categoryController.createNewCategory);

		apiRouter.put('/category/:categoryId/status',categoryController.changeCategoryStatus);

		return apiRouter;
	}
}

export default AdminRoute;
