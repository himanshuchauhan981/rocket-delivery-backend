const e = require('express');
const moment = require('moment');

const { connection } = require('../db');
const { responseMessages, commonFunctions, emailTemplates } = require('../lib');

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
					response: responseMessages.SUCCESS,
					finalData: { token },
				};
			} else {
				return {
					response: responseMessages.EXISTED_USER,
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
						response: responseMessages.SUCCESS,
						finalData: { token, name: existingUser[0].name },
					};
				} else {
					return {
						response: responseMessages.INVALID_EMAIL_PASSWORD,
						finalData: {},
					};
				}
			} else {
				return {
					response: responseMessages.INVALID_EMAIL_PASSWORD,
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
				response: responseMessages.NEW_ADDRESS,
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
				response: responseMessages.SUCCESS,
				finalData: { userAddressesDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	viewUserDetails: async (userDetails) => {
		try {
			let userDetailsQuery =
				'SELECT name, email, countryCode, mobileNumber from users where id = ?';
			let userDetail = await connection.executeQuery(userDetailsQuery, [
				userDetails.id,
			]);

			return {
				response: responseMessages.SUCCESS,
				finalData: { userDetails: userDetail[0] },
			};
		} catch (err) {
			throw err;
		}
	},

	updateUserDetails: async (payload, userDetails) => {
		try {
			if (payload.password) {
			} else {
				let existingEmailQuery =
					'SELECT email, name from users where email = ?';
				let existingEmailDetails = await connection.executeQuery(
					existingEmailQuery,
					[payload.email]
				);

				if (existingEmailDetails && existingEmailDetails.length === 0) {
					let emailUpdate = '';
					let params = [];
					if (payload.touchedEmail) {
						emailUpdate = 'email = ?,';
						params.push(payload.email);
					}

					let updateUserDetailQuery = `UPDATE users set ${emailUpdate} name = ? where id = ?`;
					params.push(payload.name, userDetails.id);

					await connection.executeQuery(updateUserDetailQuery, params);

					let userDetailsQuery = 'SELECT email, name from users where id = ?';
					let userData = await connection.executeQuery(userDetailsQuery, [
						userDetails.id,
					]);

					return {
						response: responseMessages.UPDATED_USER_DETAILS,
						finalData: { email: userData[0].email, name: userData[0].name },
					};
				} else {
					let updateUserDetailQuery = `UPDATE users set name = ? where id = ?`;

					await connection.executeQuery(updateUserDetailQuery, [
						payload.name,
						userDetails.id,
					]);
					return {
						response: payload.touchedEmail
							? responseMessages.EXISTING_USER_EMAIL
							: responseMessages.SUCCESS,
						finalData: payload,
					};
				}
			}
		} catch (err) {
			throw err;
		}
	},

	forgetPassword: async (payload) => {
		try {
			let userDetailsQuery =
				'select name, otp, otpValidity from users where email = ?';
			let userDetails = await connection.executeQuery(userDetailsQuery, [
				payload.email,
			]);
			let finalData = {};

			if (userDetails.length > 0) {
				let existingOTP = userDetails[0].otp;
				let existingOTPValidity = userDetails[0].otpValidity;

				if (existingOTP !== null && existingOTPValidity !== null) {
					let currentDate = moment().toISOString();

					let validityStatus =
						moment(existingOTPValidity).isBefore(currentDate);
					if (validityStatus) {
						let otp = commonFunctions.generateOTP();
						let otpValidity = moment()
							.add(2, 'minutes')
							.format('YYYY-MM-DD HH:mm:ss');

						let updateUserOTPQuery =
							'UPDATE users set otp = ?, otpValidity = ? where email = ?';
						await connection.executeQuery(updateUserOTPQuery, [
							otp,
							otpValidity,
							payload.email,
						]);
						finalData = { otpValidity };
					} else {
						finalData = { otpValidity: existingOTPValidity };
					}
				} else {
					let otp = commonFunctions.generateOTP();
					let otpValidity = moment()
						.add(2, 'minutes')
						.format('YYYY-MM-DD HH:mm:ss');

					let updateUserOTPQuery =
						'UPDATE users set otp = ?, otpValidity = ? where email = ?';
					await connection.executeQuery(updateUserOTPQuery, [
						otp,
						otpValidity,
						payload.email,
					]);
					await connection.executeQuery(updateUserOTPQuery, [
						otp,
						otpValidity,
						payload.email,
					]);

					finalData = { otpValidity };
				}
			}

			return {
				response: responseMessages.RESET_PASSWORD_SUCCESS,
				finalData,
			};
		} catch (err) {
			throw err;
		}
	},

	verifyOTP: async (payload) => {
		try {
			let userDetailsQuery =
				'SELECT otp, otpValidity from users where email = ?';
			let userDetails = await connection.executeQuery(userDetailsQuery, [
				payload.email,
			]);
			let otp = parseInt(payload.otp, 10);
			if (otp === userDetails[0].otp) {
				return { response: responseMessages.VERIFIED_OTP, finalData: {} };
			} else {
				return { response: responseMessages.INVALID_OTP, finalData: {} };
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = userHandler;
