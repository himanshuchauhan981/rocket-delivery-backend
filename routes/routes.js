const express = require('express');

const { productController, userController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get('/homeCategories', productController.getHomeCategories);

	router.get('/subCategory', productController.getSubCategoryItems);

	router.get('/products', productController.getProducts);

	router.get('/product', productController.getProductDetails);

	router.post('/signup', userController.createNewUser);

	router.post('/login', userController.loginExistingUser);

	return router;
};
