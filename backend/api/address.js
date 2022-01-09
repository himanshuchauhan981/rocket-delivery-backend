import express from 'express';

import AddressController from '../controllers/addressController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

class AddressRoutes {
	async initiateAddressRoutes() {
		const apiRouter = express.Router();

		const addressController = new AddressController();
		const schemaMiddleware = new SchemaMiddleware();
		const authMiddleware = new AuthMiddleware();

		apiRouter.post(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.ADD_NEW_ADDRESS),
			authMiddleware.apiAuth,
			addressController.addNewAddress
		);

		apiRouter.patch(
			'/',
			schemaMiddleware.validateSchema(SchemaValidator.EDIT_ADDRESS),
			authMiddleware.apiAuth,
			addressController.editAddress
		);

		apiRouter.get(
			'/list',
			authMiddleware.apiAuth,
			addressController.viewUserAddress
		);

		return apiRouter;
	}
}

export default AddressRoutes;
