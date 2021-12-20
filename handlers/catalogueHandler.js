import sequelize from 'sequelize';

import ResponseMessages from '../lib/responseMessages.js';
import Image from '../models/image.js';

class CatalogueHandler {
	async getCatalogueImages(payload) {
		return new Promise((resolve, reject) => {
			try {
				Image.findAll({
					where: {
						[sequelize.Op.and]: [{ type: payload.type }, { is_deleted: 0 }],
					},
					attributes: ['id', 'name', 'url'],
				})
					.then((imageDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { imageList: imageDetails },
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
}

export default CatalogueHandler;
