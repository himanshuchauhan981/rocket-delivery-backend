const express = require('express');

const { productController, userController } = require('../controllers');
const { authMiddleware, schemaMiddleware } = require('../middlewares');
const { schemaValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.get('/homeCategories', productController.getHomeCategories);

	router.get('/subCategory', productController.getSubCategoryItems);

	router.get('/products', productController.getProducts);

	router.get('/product', productController.getProductDetails);

	router.post('/signup', userController.createNewUser);

	router.post('/login', userController.loginExistingUser);

	router.get('/cartProductDetails', productController.getCartProductDetails);

	router.post(
		'/addNewAddress',
		schemaMiddleware(schemaValidator.ADD_NEW_ADDRESS),
		authMiddleware
	);

	return router;
};
