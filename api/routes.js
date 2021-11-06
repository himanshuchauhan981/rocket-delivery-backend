import express from 'express';

import AddressRoutes from './address.js';
import OrderRoutes from './orders.js';
import PaymentRoute from './payment.js';
import UserRoute from './user.js';
import WishlistRoute from './wishlist.js';
import ProductRoute from './products.js';

export default class Routes {
	static async prepareRoutes(app) {
		const userRoutes = new UserRoute();
		const addressRoutes = new AddressRoutes();
		const paymentRoutes = new PaymentRoute();
		const orderRoutes = new OrderRoutes();
		const wishlistRoutes = new WishlistRoute();
		const productRoutes = new ProductRoute();

		const userAPI = await userRoutes.initiateUserRoutes();
		const wishlistAPI = await wishlistRoutes.initiateWishlistRoutes();
		const addressAPI = await addressRoutes.initiateAddressRoutes();
		const paymentAPI = await paymentRoutes.initiatePaymentRoutes();
		const productAPI = await productRoutes.initiateProductRoutes();
		const orderAPI = await orderRoutes.initiateOrderRoutes();

		app.use('/wishlist', wishlistAPI);
		app.use('/', userAPI);

		app.use('/product', productAPI);
		app.use('/address', addressAPI);
		app.use('/payment', paymentAPI);
		app.use('/order', orderAPI);
	}
}
