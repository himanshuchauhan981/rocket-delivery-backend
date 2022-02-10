import sequelize from 'sequelize';

import ResponseMessages from '../lib/responseMessages.js';
import SubCategories from '../models/subCategories.js';

export default class SubCategoryHandler {
	async findAll() {
		return new Promise((resolve, reject) => {
			try {
				SubCategories.findAll({
					where: { [sequelize.Op.and]: [{ is_active: 1 }, { is_deleted: 0 }] },
					attributes: ['id', 'name', 'category_id'],
				}).then((subCategoriesList) => {
					resolve({
						response: ResponseMessages.SUCCESS,
						finalData: { subCategoriesList },
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
