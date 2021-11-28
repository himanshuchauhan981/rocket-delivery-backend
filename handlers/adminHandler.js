import sequelize from 'sequelize';

import ResponseMessages from '../lib/responseMessages.js';
import Admin from '../models/admin.js';
import Common from '../lib/commonFunctions.js';
import Categories from '../models/categories.js';
import SubCategories from '../models/subCategories.js';
import Products from '../models/products.js';

class AdminHandler {
	async loginAdmin(payload) {
		let common = new Common();
		return new Promise(async (resolve, reject) => {
			try {
				let adminDetails = await Admin.findOne({ email: payload.email });
				if (adminDetails) {
					let comparedPassword = common.compareHashedPassword(
						payload.password,
						adminDetails.password
					);

					if (comparedPassword) {
						let token = common.generateJWTToken({ id: adminDetails.id });

						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { token },
						});
					} else {
						resolve({
							response: ResponseMessages.INVALID_EMAIL_PASSWORD,
							finalData: {},
						});
					}
				} else {
					resolve({
						response: ResponseMessages.INVALID_EMAIL_PASSWORD,
						finalData: {},
					});
				}
			} catch (err) {
				reject(err);
			}
		});
	}

	async adminCategories(payload) {
		return new Promise((resolve, reject) => {
			try {
				const pageIndex = payload.pageIndex * payload.pageSize;

				Categories.findAndCountAll({
					where: { is_deleted: 0 },
					attributes: ['name', 'image', 'is_active', 'id'],
					order: sequelize.literal('name'),
					limit: payload.pageSize,
					offset: pageIndex,
				}).then(async (categories) => {
					let categoriesDetails = [];

					for (const item of categories.rows) {
						const totalSubCategories = await SubCategories.findAndCountAll({
							where: { category_id: item.id },
							attributes: ['id'],
						});

						const totalProducts = await Products.findAndCountAll({
							where: { category_id: item.id },
						});

						categoriesDetails.push({
							id: item.id,
							name: item.name,
							image: item.image,
							is_active: Boolean(item.is_active),
							subCategoriesCount: totalSubCategories.count,
							productsCount: totalProducts.count,
						});
					}
					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: { categoriesDetails, count: categories.count },
					});
				});
			} catch (err) {
				reject(err);
			}
		});
	}
}

export default AdminHandler;
