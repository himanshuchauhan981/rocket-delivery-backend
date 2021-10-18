const sequelize = require('sequelize');
const Op = sequelize.Op;

const { responseMessages } = require('../lib');
const { ProductReview, ProductReviewImages } = require('../models');

const ratingHandler = {
	saveNewReview: (payload, userDetails) => {
		console.log(payload);
		return new Promise((resolve, reject) => {
			try {
				let productImages = [];

				ProductReview.create({
					headline: payload.headline,
					opinion: payload.opinion,
					user_id: userDetails.id,
					product_id: payload.productId,
					ratings: payload.ratings,
				}).then(async (newReview) => {
					payload.reviewImages.forEach((image) =>
						productImages.push({ image, review_id: newReview.id })
					);
					if (productImages.length !== 0) {
						await ProductReviewImages.bulkCreate(productImages);
					}

					resolve({
						response: responseMessages.SUCCESS,
						finalData: {},
					});
				});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},
};

module.exports = ratingHandler;
