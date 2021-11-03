import AddressController from '../controllers/addressController.js';
import SchemaValidator from '../validator/schemaValidator.js';
import SchemaMiddleware from '../middlewares/schemaMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

class AddressRoutes {
	async initiateAddressRoutes(apiRouter) {
		let addressController = new AddressController();
		let schemaMiddleware = new SchemaMiddleware();
		let authMiddleware = new AuthMiddleware();

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
			'/',
			authMiddleware.apiAuth,
			addressController.viewUserAddress
		);

		return apiRouter;
	}
}

export default AddressRoutes;
