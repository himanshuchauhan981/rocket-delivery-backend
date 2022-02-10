import express from 'express';

import PaymentController from '../controllers/paymentController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

export default class PaymentRoute {
	async initiatePaymentRoutes() {
		const apiRouter = express.Router();

		const paymentController = new PaymentController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();

		apiRouter.get(
			'/razorpay/order',
			schemaMiddleware.validateSchema(SchemaValidator.RAZORPAY_ORDER),
			authMiddleware.apiAuth,
			paymentController.createRazorpayOrder
		);

		return apiRouter;
	}
}
