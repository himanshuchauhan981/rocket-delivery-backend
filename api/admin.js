import express from 'express';

import AdminController from '../controllers/adminController.js';
import CategoryController from '../controllers/categoryController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';

class AdminRoute {
	async initiateAdminRoute() {
		const apiRouter = express.Router();

		const adminController = new AdminController();
		const categoryController = new CategoryController();
		const schemaMiddleware = new SchemaMiddleware();

		apiRouter.post('/login', adminController.loginAdmin);

		apiRouter.get(
			'/categories',
			schemaMiddleware.validateSchema(SchemaValidator.LIST_CATEGORIES),
			adminController.adminCategories
		);

		apiRouter.post('/category', categoryController.createNewCategory);

		apiRouter.put(
			'/category/:categoryId/status',
			schemaMiddleware.validateSchema(SchemaValidator.CHANGE_CATEGORY_STATUS),
			categoryController.changeCategoryStatus
		);

		apiRouter.delete('/category', categoryController.deleteCategory);

		return apiRouter;
	}
}

export default AdminRoute;
