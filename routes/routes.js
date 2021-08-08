const express = require('express');

const { productController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get('/homeCategories', productController.getHomeCategories);

	return router;
};
