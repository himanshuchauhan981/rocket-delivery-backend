import Categories from '../models/categories.js';
import ResponseMessages from '../lib/responseMessages.js';

class CategoryHandler {
	async createNewCategory(payload) {
		return new Promise((resolve, reject) => {
			try {
				Categories.create({
					name: payload.name,
					image: payload.image,
					is_sub_category: 0,
					is_active: 0,
				})
					.then((newCategory) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: {},
						});
					})
					.catch((err) => {
						console.log(err);
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

	async changeCategoryStatus(params, payload) {
		return new Promise((resolve, reject) => {
			try {
				Categories.update(
					{ status: payload.status },
					{ where: { id: params.categoryId } }
				).then((res) => {
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

export default CategoryHandler;
