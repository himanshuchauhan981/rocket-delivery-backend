import sequelize from 'sequelize';

import Categories from '../models/categories.js';
import ResponseMessages from '../lib/responseMessages.js';
import SubCategories from '../models/subCategories.js';
import Products from '../models/products.js';

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

	async deleteCategory(payload) {
		return new Promise(async (resolve, reject) => {
			try {
				for (const categoryId of payload.categoryIds) {
					await Products.update(
						{ is_active: 0, is_deleted: 1 },
						{ where: { category_id: categoryId } }
					);

					await SubCategories.update(
						{ is_active: 0, is_deleted: 1 },
						{ where: { category_id: categoryId } }
					);

					await Categories.update(
						{ is_active: 0, is_deleted: 1 },
						{ where: { id: categoryId } }
					);

					resolve({
						response: ResponseMessages.SUCCESS,
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

	async getCategoryDetails(payload) {
		return new Promise((resolve, reject) => {
			try {
				Categories.findOne({
					where: { id: payload.id },
					attributes: ['id', 'name', 'image'],
				})
					.then((category) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { category },
						});
					})
					.catch((err) => {
						reject({ response: ResponseMessages.SERVER_ERROR, finalData: {} });
					});
			} catch (err) {
				console.log(err);
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}
}

export default CategoryHandler;
