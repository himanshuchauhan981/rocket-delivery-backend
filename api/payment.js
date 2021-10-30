import PaymentController from '../controllers/paymentController.js';

export default class PaymentRoute {
	async initiatePaymentRoutes(apiRouter) {
		let paymentController = new PaymentController();

		apiRouter.get('/razorpay/order', paymentController.createRazorpayOrder);

		return apiRouter;
	}
}
