import express from 'express';

import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import OrderController from '../controllers/orderController.js';

class OrderRoutes {
	async initiateOrderRoutes() {
		const apiRouter = express.Router();

		const orderController = new OrderController();
		const authMiddleware = new AuthMiddleware();
		const schemaMiddleware = new SchemaMiddleware();

		apiRouter.post(
			'/new',
			authMiddleware.apiAuth,
			orderController.generateNewOrder
		);

		apiRouter.get(
			'/list',
			authMiddleware.apiAuth,
			orderController.getUserOrders
		);

		apiRouter.get(
			'/:orderId',
			authMiddleware.apiAuth,
			schemaMiddleware.validateSchema(SchemaValidator.SPECIFIC_ORDER_DETAILS),
			orderController.specificOrderDetails
		);

		apiRouter.patch(
			'/status',
			schemaMiddleware.validateSchema(SchemaValidator.CHANGE_ORDER_STATUS),
			orderController.changeOrderStatus
		);

		return apiRouter;
	}
}

export default OrderRoutes;
