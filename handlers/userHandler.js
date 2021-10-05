const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { connection } = require('../db');
const { responseMessages, commonFunctions, emailTemplates } = require('../lib');
const { Users } = require('../models');

let findExistingUser = (payload) => {
	return new Promise((resolve, reject) => {
		let existingUserQuery = {
			[Op.or]: [
				{ email: payload.email },
				{
					mobile_number: payload.mobileNumber ? payload.mobileNumber : null,
				},
			],
		};

		Users.findAll({
			where: existingUserQuery,
			attributes: ['email', 'password', 'mobile_number', 'name'],
		})
			.then((existingUser) => {
				resolve(existingUser);
			})
			.catch((err) => reject({}));
	});
};

const userHandler = {
	createNewUser: async (payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				let existingUser = await findExistingUser(payload);

				if (existingUser.length === 0) {
					let hashedPassword = commonFunctions.generateHashPassword(
						payload.password
					);

					Users.create({
						name: payload.name,
						email: payload.email,
						password: hashedPassword,
						country_code: payload.countryCode,
						mobile_number: payload.mobileNumber,
						type: payload.type,
					}).then((newUser) => {
						let token = commonFunctions.generateJWTToken({
							id: newUser.id,
							type: newUser.type,
						});

						resolve({
							response: responseMessages.SUCCESS,
							finalData: { token },
						});
					});
				} else {
					reject({
						response: responseMessages.EXISTED_USER,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	loginExistingUser: async (payload) => {
		return new Promise((resolve, reject) => {
			findExistingUser(payload).then((existingUser) => {
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

						resolve({
							response: responseMessages.SUCCESS,
							finalData: { token, name: existingUser[0].name },
						});
					} else {
						resolve({
							response: responseMessages.INVALID_EMAIL_PASSWORD,
							finalData: {},
						});
					}
				} else {
					reject({
						response: responseMessages.INVALID_EMAIL_PASSWORD,
						finalData: {},
					});
				}
			});
		}).catch((err) => {
			reject({
				response: responseMessages.SERVER_ERROR,
				finalData: {},
			});
		});
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
			let existingEmailQuery = 'SELECT email, name from users where email = ?';
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
			let subject = 'Recover you password';

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

						let resetPasswordTemplate = emailTemplates.resetPassword(
							userDetails[0].name,
							otp
						);
						await commonFunctions.sendEmailThroughSMTP(
							payload.email,
							subject,
							resetPasswordTemplate
						);

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

					let resetPasswordTemplate = emailTemplates.resetPassword(
						userDetails[0].name,
						otp
					);
					await commonFunctions.sendEmailThroughSMTP(
						payload.email,
						subject,
						resetPasswordTemplate
					);

					finalData = { otpValidity };
				}

				return {
					response: responseMessages.RESET_PASSWORD_SUCCESS,
					finalData,
				};
			} else {
				return { response: responseMessages.NON_EXISTED_EMAIL, finalData: {} };
			}
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

			if (payload.otp === userDetails[0].otp) {
				return { response: responseMessages.VERIFIED_OTP, finalData: {} };
			} else {
				return { response: responseMessages.INVALID_OTP, finalData: {} };
			}
		} catch (err) {
			throw err;
		}
	},
	updateUserPassword: async (payload) => {
		try {
			let hashedPassword = commonFunctions.generateHashPassword(
				payload.newPassword
			);
			let updatePasswordQuery = 'UPDATE users SET password = ? where email = ?';
			await connection.executeQuery(updatePasswordQuery, [
				hashedPassword,
				payload.email,
			]);

			return { response: responseMessages.SUCCESS, finalData: {} };
		} catch (err) {
			throw err;
		}
	},
};

module.exports = userHandler;
