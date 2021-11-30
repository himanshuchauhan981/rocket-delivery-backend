import express from 'express';

import AdminController from '../controllers/adminController.js';
import CategoryController from '../controllers/categoryController.js';
import ProductController from '../controllers/productController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

class AdminRoute {
	async initiateAdminRoute() {
		const apiRouter = express.Router();

		const adminController = new AdminController();
		const categoryController = new CategoryController();
		const productController = new ProductController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();

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

		apiRouter.delete(
			'/category',
			authMiddleware.apiAuth,
			categoryController.deleteCategory
		);

		apiRouter.get(
			'/products',
			authMiddleware.apiAuth,
			productController.getAdminProducts
		);

		apiRouter.get(
			'/category/:id',
			authMiddleware.apiAuth,
			categoryController.getCategoryDetail
		);

		return apiRouter;
	}
}

export default AdminRoute;
