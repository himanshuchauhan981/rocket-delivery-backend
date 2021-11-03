import ProductReview from '../models/productReview.js';
import ProductReviewImages from '../models/productReviewImages.js';
import ResponseMessages from '../lib/responseMessages.js';

export default class ReviewHandler {
	async create(payload, userDetails) {
		return new Promise((resolve, reject) => {
			try {
				let productImages = [];

				ProductReview.create({
					headline: payload.headline,
					opinion: payload.opinion,
					user_id: userDetails.id,
					product_id: payload.productId,
					ratings: payload.ratings,
					order_id: payload.orderId,
				}).then(async (newReview) => {
					payload.reviewImages.forEach((image) =>
						productImages.push({ image, review_id: newReview.id })
					);
					if (productImages.length !== 0) {
						await ProductReviewImages.bulkCreate(productImages);
					}

					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: {},
					});
				});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async update(payload) {
		return new Promise((resolve, reject) => {
			try {
				ProductReview.update(
					{
						headline: payload.headline,
						opinion: payload.opinion,
						ratings: payload.ratings,
					},
					{ where: { id: payload.reviewId } }
				)
					.then(async () => {
						let productImages = [];

						for (let i = 0; i < payload.removeImageId.length; i++) {
							await ProductReviewImages.update(
								{ is_deleted: 1 },
								{ where: { id: payload.removeImageId[i] } }
							);
						}

						payload.reviewImages.forEach((item) => {
							if (item.id === undefined) {
								productImages.push({
									image: item.downloadURL,
									review_id: payload.reviewId,
								});
							}
						});
						if (productImages.length !== 0) {
							await ProductReviewImages.bulkCreate(productImages);
						}
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: {},
						});
					})
					.catch((err) => {
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async delete(payload) {
		return new Promise((resolve, reject) => {
			try {
				ProductReview.update(
					{ is_deleted: 1 },
					{ where: { id: payload.reviewId } }
				).then(() => {
					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: {},
					});
				});
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}
}

// const sequelize = require('sequelize');
// const Op = sequelize.Op;

// const { responseMessages } = require('../lib');
// const { ProductReview, ProductReviewImages } = require('../models');

// const ratingHandler = {

// };

// module.exports = ratingHandler;
