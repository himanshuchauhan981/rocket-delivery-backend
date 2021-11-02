import express from 'express';
import AddressRoutes from './address.js';
import OrderRoutes from './orders.js';
import PaymentRoute from './payment.js';
import UserRoute from './user.js';
import WishlistRoute from './wishlist.js';

export default class Routes extends UserRoute {
	apiRouter;
	static async prepareRoutes(app) {
		this.apiRouter = express.Router();

		const userRoutes = new UserRoute();
		const addressRoutes = new AddressRoutes();
		const paymentRoutes = new PaymentRoute();
		const orderRoutes = new OrderRoutes();
		const wishlistRoutes = new WishlistRoute();

		const userAPI = await userRoutes.initiateUserRoutes(this.apiRouter);
		const addressAPI = await addressRoutes.initiateAddressRoutes(
			this.apiRouter
		);
		const paymentAPI = await paymentRoutes.initiatePaymentRoutes(
			this.apiRouter
		);
		const orderAPI = await orderRoutes.initiateOrderRoutes(this.apiRouter);
		const wishlistAPI = await wishlistRoutes.initiateWishlistRoutes(
			this.apiRouter
		);

		app.use('/', userAPI);
		app.use('/address', addressAPI);
		app.use('/payment', paymentAPI);
		app.use('/order', orderAPI);
		app.use('/wishlist', wishlistAPI);
	}
}

// module.exports = () => {
// 	const router = express.Router();

// 	router.get('/homeCategories', productController.getHomeCategories);

// 	router.get(
// 		'/subCategory',
// 		schemaMiddleware(schemaValidator.GET_SUB_CATEGORY_ITEMS),
// 		productController.getSubCategoryItems
// 	);

// 	router.get(
// 		'/products',
// 		schemaMiddleware(schemaValidator.GET_PRODUCTS),
// 		productController.getProducts
// 	);

// 	router.get(
// 		'/product',
// 		schemaMiddleware(schemaValidator.PRODUCT_DETAILS),
// 		productController.getProductDetails
// 	);

// 	router.post('/cartProductDetails', productController.getCartProductDetails);

// 	router.get('/discountOffers', productController.getDiscountOffers);

// 	router.post(
// 		'/addToHistory',
// 		schemaMiddleware(schemaValidator.ADD_TO_PRODUCT_HISTORY),
// 		authMiddleware,
// 		productController.addToProductHistory
// 	);

// 	router.get(
// 		'/viewHistory',
// 		authMiddleware,
// 		productController.viewUserProductHistory
// 	);

// 	router.delete(
// 		'/removeProductHistory',
// 		schemaMiddleware(schemaValidator.REMOVE_PRODUCT_HISTORY),
// 		authMiddleware,
// 		productController.removeFromProductHistory
// 	);

// 	router.get(
// 		'/productOffers',
// 		authMiddleware,
// 		productController.getProductOffers
// 	);

// 	router.post(
// 		'/review',
// 		schemaMiddleware(schemaValidator.ADD_NEW_REVIEW),
// 		authMiddleware,
// 		reviewController.saveNewReview
// 	);

// 	router.patch('/review', authMiddleware, reviewController.updateReview);

// 	router.delete(
// 		'/review',
// 		authMiddleware,
// 		schemaMiddleware(schemaValidator.DELETE_REVIEW),
// 		reviewController.deleteReview
// 	);

// 	return router;
// };
