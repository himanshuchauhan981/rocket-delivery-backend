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
			let existingUserQuery = `select id,password, isActive from users where email = ?`;
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
						finalData: { token },
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
};

module.exports = userHandler;
