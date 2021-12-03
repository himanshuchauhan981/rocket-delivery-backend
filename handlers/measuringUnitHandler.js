import sequelize from 'sequelize';

import MeasuringUnits from '../models/measuringUnits.js';
import ResponseMessages from '../lib/responseMessages.js';

class MeasurementUnitHandler {
	list() {
		return new Promise((resolve, reject) => {
			try {
				MeasuringUnits.findAll({
					where: { [sequelize.Op.and]: [{ is_deleted: 0 }, { is_active: 1 }] },
					attributes: ['id', 'symbol', 'measuring_type'],
				})
					.then((measuringUnitDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { measuringUnitDetails },
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

export default MeasurementUnitHandler;
