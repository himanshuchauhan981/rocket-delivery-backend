const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { connection } = require('../db');
const { responseMessages, commonFunctions, emailTemplates } = require('../lib');
const { Users, Address } = require('../models');

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
			attributes: ['email', 'password', 'mobile_number', 'name', 'id'],
		})
			.then((existingUser) => {
				resolve(existingUser);
			})
			.catch((err) => reject({}));
	});
};

const updateUserOTP = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			let otp = commonFunctions.generateOTP();
			let otpValidity = moment()
				.add(2, 'minutes')
				.format('YYYY-MM-DD HH:mm:ss');
			Users.update(
				{ otp: otp, otp_validity: otpValidity },
				{ where: { email: email } }
			)
				.then((data) => {
					resolve({});
				})
				.catch((err) => {
					reject({});
				});
		} catch (err) {
			reject({});
		}
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
							response: responseMessages.NEW_ADDRESS,
							finalData: {},
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	viewUserAddress: async (userDetails) => {
		return new Promise((resolve, reject) => {
			try {
				let addressCondition = {
					[Op.and]: [{ user_id: userDetails.id }, { is_deleted: 0 }],
				};

				Address.findAll({
					where: addressCondition,
					attributes: [
						'id',
						'user_id',
						'full_name',
						'pincode',
						'house_no',
						'area',
						'city',
						'state',
						'landmark',
						'country_code',
						'mobile_number',
					],
				})
					.then((userAddressesDetails) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { userAddressesDetails },
						});
					})
					.catch((err) =>
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						})
					);
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	viewUserDetails: async (userDetails) => {
		return new Promise((resolve, reject) => {
			try {
				Users.findOne({
					where: { id: userDetails.id },
					attributes: ['name', 'email', 'country_code', 'mobile_number'],
				})
					.then((userDetails) => {
						resolve({
							response: responseMessages.SUCCESS,
							finalData: { userDetails },
						});
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
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
		return new Promise((resolve, reject) => {
			try {
				Users.findAll({
					where: { email: payload.email },
					attributes: ['name', 'otp', 'otp_validity'],
				})
					.then(async (userDetails) => {
						let subject = 'Recover you password';
						let finalData = {};
						if (userDetails.length > 0) {
							let existingOTP = userDetails[0].otp;
							let existingOTPValidity = userDetails[0].otp_validity;

							if (existingOTP !== null && existingOTPValidity !== null) {
								let currentDate = moment().toISOString();
								let validityStatus =
									moment(existingOTPValidity).isBefore(currentDate);
								if (validityStatus) {
									await updateUserOTP(payload.email);

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
								await updateUserOTP(payload.email);

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

							resolve({
								response: responseMessages.RESET_PASSWORD_SUCCESS,
								finalData,
							});
						} else {
							resolve({
								response: responseMessages.NON_EXISTED_EMAIL,
								finalData: {},
							});
						}
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},

	verifyOTP: async (payload) => {
		return new Promise((resolve, reject) => {
			try {
				Users.findAll({
					where: { email: payload.email },
					attributes: ['otp', 'otp_validity'],
				})
					.then((userDetails) => {
						if (userDetails.length > 0) {
							if (payload.otp === userDetails[0].otp) {
								resolve({
									response: responseMessages.VERIFIED_OTP,
									finalData: {},
								});
							} else {
								resolve({
									response: responseMessages.INVALID_OTP,
									finalData: {},
								});
							}
						}
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},
	updateUserPassword: async (payload) => {
		return new Promise(async (resolve, reject) => {
			try {
				let hashedPassword = commonFunctions.generateHashPassword(
					payload.newPassword
				);

				await Users.update(
					{ password: hashedPassword },
					{ where: { email: payload.email } }
				)
					.then((data) => {
						resolve({ response: responseMessages.SUCCESS, finalData: {} });
					})
					.catch((err) => {
						reject({
							response: responseMessages.SERVER_ERROR,
							finalData: {},
						});
					});
			} catch (err) {
				reject({
					response: responseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	},
};

module.exports = userHandler;
