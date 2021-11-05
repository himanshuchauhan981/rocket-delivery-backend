import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import ProductController from '../controllers/productController.js';
import ReviewController from '../controllers/reviewController.js';

export default class ProductRoute {
	async initiateProductRoutes(apiRouter) {
		let schemaMiddleware = new SchemaMiddleware();
		let authMiddleware = new AuthMiddleware();
		let productController = new ProductController();
		let reviewController = new ReviewController();

		apiRouter.get(
			'/list',
			schemaMiddleware.validateSchema(SchemaValidator.GET_PRODUCTS),
			productController.getProducts
		);

		apiRouter.post(
			'/history',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_TO_PRODUCT_HISTORY),
			authMiddleware.apiAuth,
			productController.addToProductHistory
		);

		apiRouter.get(
			'/history',
			authMiddleware.apiAuth,
			productController.viewUserProductHistory
		);

		apiRouter.delete(
			'/history',
			schemaMiddleware.validateSchema(SchemaValidator.REMOVE_PRODUCT_HISTORY),
			authMiddleware.apiAuth,
			productController.removeFromProductHistory
		);

		apiRouter.post(
			'/review',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_NEW_REVIEW),
			authMiddleware.apiAuth,
			reviewController.saveNewReview
		);

		apiRouter.patch(
			'/review',
			authMiddleware.apiAuth,
			reviewController.updateReview
		);

		apiRouter.delete(
			'/review',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.DELETE_REVIEW),
			reviewController.deleteReview
		);

		apiRouter.get('/discountOffers', productController.getDiscountOffers);

		apiRouter.get(
			'/offers',
			authMiddleware.apiAuth,
			productController.getProductOffers
		);

		apiRouter.get(
			'/:id',
			// schemaMiddleware.validateSchema(SchemaValidator.PRODUCT_DETAILS),
			productController.getProductDetails
		);

		return apiRouter;
	}
}
