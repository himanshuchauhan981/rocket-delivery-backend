const { connection } = require('../db');
const { commonFunctions } = require('../lib');

const userHandler = {
	createNewUser: async (payload) => {
		try {
			let insertUserQuery = `INSERT INTO users (name,email,password,countryCode,mobileNumber,type) VALUES (?,?,?,?,?,?)`;

			let existingUserQuery =
				'SELECT * FROM users WHERE email = ? OR mobileNumber = ?';

			let existingUser = await connection.executeQuery(existingUserQuery, [
				payload.email,
				payload.mobileNo,
			]);

			if (existingUser.length === 0) {
				let hashedPassword = commonFunctions.generateHashPassword(
					payload.password
				);
				let newUser = await connection.executeQuery(insertUserQuery, [
					payload.name,
					payload.email,
					hashedPassword,
					payload.countryCode,
					payload.mobileNo,
					payload.type,
				]);
				let newUserQuery = 'SELECT id,type FROM users where id = ?';
				let newUserDetails = await connection.executeQuery(newUserQuery, [
					newUser.insertId,
				]);

				let token = commonFunctions.generateJWTToken({
					id: newUserDetails[0].id,
					type: newUserDetails[0].type,
				});

				return {
					response: { STATUS_CODE: 200, MSG: 'Success' },
					finalData: { token },
				};
			} else {
				return {
					response: { STATUS_CODE: 409, MSG: 'User already existed' },
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},
	loginExistingUser: async (payload) => {
		try {
			let existingUserQuery = `select id,password,name, isActive from users where email = ?`;
			let existingUser = await connection.executeQuery(existingUserQuery, [
				payload.email,
			]);

			if (existingUser.length !== 0) {
				let comparedPassword = commonFunctions.compareHashedPassword(
					payload.password,
					existingUser[0].password
				);
				if (comparedPassword) {
					let token = commonFunctions.generateJWTToken({
						id: existingUser[0].id,
						type: existingUser[0].type,
					});

					return {
						response: { STATUS_CODE: 200, MSG: 'Success' },
						finalData: { token, name: existingUser[0].name },
					};
				} else {
					return {
						response: { STATUS_CODE: 401, MSG: 'Invalid email or passsword' },
						finalData: {},
					};
				}
			} else {
				return {
					response: { STATUS_CODE: 401, MSG: 'Invalid email or passsword' },
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},
	addNewAddress: async (payload, userDetails) => {
		try {
			let newAddressQuery =
				'INSERT into address (userId,fullName,pinCode,houseNo,area,city,state,landmark,latitude,longitude,countryCode,mobileNumber) values(?,?,?,?,?,?,?,?,?,?,?,?)';
			await connection.executeQuery(newAddressQuery, [
				userDetails.id,
				payload.fullName,
				payload.pinCode,
				payload.houseNo,
				payload.area,
				payload.city,
				payload.state,
				payload.landmark,
				payload.latitude,
				payload.longitude,
				payload.countryCode,
				payload.mobileNumber,
			]);

			return {
				response: { STATUS_CODE: 200, MSG: 'New address saved' },
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},

	viewUserAddress: async (userDetails) => {
		try {
			let addressQuery =
				'SELECT * from address where userId = ? and isDeleted = ?';
			let userAddressesDetails = await connection.executeQuery(addressQuery, [
				userDetails.id,
				0,
			]);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { userAddressesDetails },
			};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = userHandler;
