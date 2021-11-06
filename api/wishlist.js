import express from 'express';

import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import WishlistController from '../controllers/wishlistController.js';

class WishlistRoute {
	async initiateWishlistRoutes() {
		const apiRouter = express.Router();
		const wishlistController = new WishlistController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();

		apiRouter.get('/list', authMiddleware.apiAuth, wishlistController.view);

		apiRouter.post(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_NEW_WISHLIST_ITEM),
			authMiddleware.apiAuth,
			wishlistController.add
		);

		apiRouter.patch(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.UPDATE_USER_WISHLIST),
			authMiddleware.apiAuth,
			wishlistController.update
		);

		return apiRouter;
	}
}

export default WishlistRoute;
