import Wishlist from '../models/wishlist.js';
import ResponseMessages from '../lib/responseMessages.js';
import Products from '../models/products.js';

export default class WishlistHandler {
	async add(payload, userDetails) {
		return new Promise(async (resolve, reject) => {
			try {
				let existingWishlistItem = await Wishlist.findAll({
					where: {
						[Op.and]: [
							{ product_id: payload.productId },
							{ user_id: userDetails.id },
							{ is_deleted: 0 },
						],
					},
					attributes: ['id'],
				});

				if (existingWishlistItem.length == 0) {
					Wishlist.create({
						product_id: payload.productId,
						user_id: userDetails.id,
					})
						.then(() => {
							resolve({
								response: ResponseMessages.NEW_WISHLIST_ITEM,
								finalData: {},
							});
						})
						.catch((err) => {
							reject({
								response: ResponseMessages.SERVER_ERROR,
								finalData: {},
							});
						});
				} else {
					resolve({
						response: ResponseMessages.EXISTING_WISHLIST_ITEM,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async view(userDetails) {
		return new Promise((resolve, reject) => {
			try {
				Wishlist.findAll({
					where: { [Op.and]: [{ user_id: userDetails.id }, { is_deleted: 0 }] },
					include: [{ model: Products, attributes: ['id', 'name', 'image'] }],
					attributes: ['id', [sequelize.col('product_id'), 'productId']],
				})
					.then((userWishlist) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { userWishlist },
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

	async update(userDetails, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				Wishlist.update(
					{ is_deleted: 1 },
					{
						where: {
							[Op.and]: [
								{ id: payload.wishlistId },
								{ user_id: userDetails.id },
							],
						},
					}
				)
					.then(() => {
						resolve({
							response: responseMessages.REMOVE_WISHLIST_ITEM,
							finalData: {},
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
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
	}
}