import express from 'express';

import AdminController from '../controllers/adminController.js';
import CategoryController from '../controllers/categoryController.js';
import ProductController from '../controllers/productController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import MeasuringUnitController from '../controllers/measuringUnitController.js';
import CatalogueController from '../controllers/catalogueController.js';
import SubCategoryController from '../controllers/subCategoryController.js';

class AdminRoute {
	async initiateAdminRoute() {
		const apiRouter = express.Router();

		const adminController = new AdminController();
		const categoryController = new CategoryController();
		const subCategoryController = new SubCategoryController();
		const productController = new ProductController();
		const measuringUnitController = new MeasuringUnitController();
		const catalogueController = new CatalogueController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();

		apiRouter.post('/login', adminController.loginAdmin);

		apiRouter.post(
			'/image',
			authMiddleware.apiAuth,
			adminController.addNewImage
		);

		apiRouter.get(
			'/categories',
			schemaMiddleware.validateSchema(SchemaValidator.LIST_CATEGORIES),
			adminController.adminCategories
		);

		apiRouter.post(
			'/category',
			schemaMiddleware.validateSchema(SchemaValidator.NEW_CATEGEORY),
			authMiddleware.apiAuth,
			categoryController.createNewCategory
		);

		apiRouter.put(
			'/category',
			schemaMiddleware.validateSchema(SchemaValidator.UPDATE_CATEGORY),
			authMiddleware.apiAuth,
			categoryController.updateCategory
		);

		apiRouter.put(
			'/category/:categoryId/status',
			schemaMiddleware.validateSchema(SchemaValidator.CHANGE_CATEGORY_STATUS),
			authMiddleware.apiAuth,
			categoryController.changeCategoryStatus
		);

		apiRouter.delete(
			'/category',
			authMiddleware.apiAuth,
			categoryController.deleteCategory
		);

		apiRouter.get(
			'/products',
			schemaMiddleware.validateSchema(SchemaValidator.ADMIN_PRODUCTS_LISTING),
			authMiddleware.apiAuth,
			productController.getAdminProducts
		);

		apiRouter.post(
			'/products',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_NEW_PRODUCT),
			authMiddleware.apiAuth,
			productController.addNewProduct
		);

		apiRouter.get(
			'/category/:id',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.GET_CATEGORY_DETAILS),
			categoryController.getCategoryDetail
		);

		apiRouter.get(
			'/subCategories/all',
			authMiddleware.apiAuth,
			subCategoryController.findAll
		);

		apiRouter.delete(
			'/product/:id',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.DELETE_PRODUCTS),
			productController.deleteProduct
		);

		apiRouter.get(
			'/product/:id',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.GET_PRODUCT_DETAILS),
			productController.getProductDetails
		);

		apiRouter.get(
			'/subCategories',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.GET_SUB_CATEGORY_ITEMS),
			productController.getSubCategoryItems
		);

		apiRouter.get(
			'/measuringUnits',
			authMiddleware.apiAuth,
			measuringUnitController.list
		);

		apiRouter.get(
			'/catalogue',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.CATALOGUE_IMAGE_LISTING),
			catalogueController.getCatalogueImages
		);

		return apiRouter;
	}
}

export default AdminRoute;
