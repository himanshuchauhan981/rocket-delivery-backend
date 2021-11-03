import express from 'express';

import AddressRoutes from './address.js';
import OrderRoutes from './orders.js';
import PaymentRoute from './payment.js';
import UserRoute from './user.js';
import WishlistRoute from './wishlist.js';
import ProductRoute from './products.js';

export default class Routes extends UserRoute {
	apiRouter;
	static async prepareRoutes(app) {
		this.apiRouter = express.Router();

		const userRoutes = new UserRoute();
		const addressRoutes = new AddressRoutes();
		const paymentRoutes = new PaymentRoute();
		const orderRoutes = new OrderRoutes();
		const wishlistRoutes = new WishlistRoute();
		const productRoutes = new ProductRoute();

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
		const productAPI = await productRoutes.initiateProductRoutes(
			this.apiRouter
		);

		app.use('/', userAPI);
		app.use('/address', addressAPI);
		app.use('/payment', paymentAPI);
		app.use('/order', orderAPI);
		app.use('/wishlist', wishlistAPI);
		app.use('/product', productAPI);
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

// 	router.post('/cartProductDetails', productController.getCartProductDetails);

// 	return router;
// };
