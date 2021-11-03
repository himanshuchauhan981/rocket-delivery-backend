import WishlistController from '../controllers/wishlistController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

export default class WishlistRoute {
	async initiateWishlistRoutes(apiRouter) {
		let wishlistController = new WishlistController();
		let schemaMiddleware = new SchemaMiddleware();
		let authMiddleware = new AuthMiddleware();

		apiRouter.post(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_NEW_WISHLIST_ITEM),
			authMiddleware.apiAuth,
			wishlistController.add
		);

		apiRouter.get('/', authMiddleware.apiAuth, wishlistController.view);

		apiRouter.patch(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.UPDATE_USER_WISHLIST),
			authMiddleware.apiAuth,
			wishlistController.update
		);

		return apiRouter;
	}
}
