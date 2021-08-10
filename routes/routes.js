const express = require('express');

const { productController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get('/homeCategories', productController.getHomeCategories);

	router.get('/subCategory', productController.getSubCategoryItems);

	router.get('/products', productController.getProducts);

	return router;
};
