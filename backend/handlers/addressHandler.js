import sequelize from 'sequelize';

import Address from '../models/userAddress.js';
import ResponseMessages from '../lib/responseMessages.js';

export default class AddressHandler {
	async save(payload, userDetails) {
		return new Promise((resolve, reject) => {
			try {
				Address.create({
					user_id: userDetails.id,
					full_name: payload.fullName,
					pincode: parseInt(payload.pinCode),
					house_no: payload.houseNo,
					area: payload.area,
					city: payload.city,
					state: payload.state,
					landmark: payload.landmark,
					latitude: parseFloat(payload.latitude),
					longitude: parseFloat(payload.longitude),
					country_code: payload.countryCode,
					mobile_number: payload.mobileNumber,
				})
					.then((newAddress) => {
						resolve({
							response: ResponseMessages.NEW_ADDRESS,
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

	async update(payload) {
		return new Promise((resolve, reject) => {
			try {
				Address.update(
					{
						full_name: payload.fullName,
						mobile_number: payload.mobileNumber,
						house_no: payload.houseNo,
						area: payload.area,
						pin_code: payload.pinCode,
						landmark: payload.landmark,
						city: payload.city,
						state: payload.state,
						country_code: payload.countryCode,
						latitude: payload.latitude,
						longitude: payload.longitude,
					},
					{ where: { id: payload.addressId } }
				)
					.then(() => {
						resolve({ response: ResponseMessages.SUCCESS, finalData: {} });
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

	async view(userDetails) {
		return new Promise((resolve, reject) => {
			try {
				let addressCondition = {
					[sequelize.Op.and]: [{ user_id: userDetails.id }, { is_deleted: 0 }],
				};

				Address.findAll({
					where: addressCondition,
					attributes: [
						'id',
						[sequelize.col('user_id'), 'userId'],
						[sequelize.col('full_name'), 'fullName'],
						[sequelize.col('pincode'), 'pinCode'],
						[sequelize.col('house_no'), 'houseNo'],
						'area',
						'city',
						'state',
						'landmark',
						[sequelize.col('country_code'), 'countryCode'],
						[sequelize.col('mobile_number'), 'mobileNumber'],
					],
					order: [['id']],
				})
					.then((userAddressesDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { userAddressesDetails },
						});
					})
					.catch((err) =>
						reject({
							response: ResponseMessages.SERVER_ERROR,
							finalData: {},
						})
					);
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}
}
