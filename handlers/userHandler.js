import sequelize from 'sequelize';
import moment from 'moment';

import Users from '../models/users.js';
import Common from '../lib/commonFunctions.js';
import ResponseMessages from '../lib/responseMessages.js';
import EmailTemplates from '../lib/emailTemplates.js';

export default class UserHandler {
	#findExistingUser = async (payload) => {
		return new Promise((resolve, reject) => {
			let existingUserQuery = {
				[sequelize.Op.or]: [
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

	#updateUserOTP = (email) => {
		let common = new Common();
		return new Promise(async (resolve, reject) => {
			try {
				let otp = common.generateOTP();
				let otpValidity = moment()
					.add(2, 'minutes')
					.format('YYYY-MM-DD HH:mm:ss');
				Users.update(
					{ otp: otp, otp_validity: otpValidity },
					{ where: { email: email } }
				)
					.then((data) => {
						resolve({ otp, otpValidity });
					})
					.catch((err) => {
						reject({});
					});
			} catch (err) {
				reject({});
			}
		});
	};

	async login(payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let existingUser = await this.#findExistingUser(payload);
				if (existingUser.length !== 0) {
					let common = new Common();
					let comparedPassword = common.compareHashedPassword(
						payload.password,
						existingUser[0].password
					);
					if (comparedPassword) {
						let token = common.generateJWTToken({
							id: existingUser[0].id,
							type: existingUser[0].type,
						});
						await Users.update(
							{ fcm_token: payload.fcm_token },
							{ where: { id: existingUser[0].id } }
						);
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { token, name: existingUser[0].name },
						});
					} else {
						resolve({
							response: ResponseMessages.INVALID_EMAIL_PASSWORD,
							finalData: {},
						});
					}
				} else {
					reject({
						response: ResponseMessages.INVALID_EMAIL_PASSWORD,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async signup(payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let common = new Common();
				let existingUser = await this.#findExistingUser(payload);

				if (existingUser.length === 0) {
					let hashedPassword = common.generateHashPassword(payload.password);
					Users.create({
						name: payload.name,
						email: payload.email,
						password: hashedPassword,
						country_code: payload.countryCode,
						mobile_number: payload.mobileNo,
						type: payload.type,
					}).then((newUser) => {
						let token = common.generateJWTToken({
							id: newUser.id,
							type: newUser.type,
						});
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { token },
						});
					});
				} else {
					reject({
						response: ResponseMessages.EXISTED_USER,
						finalData: {},
					});
				}
			} catch (err) {
				reject({
					response: ResponseMessages.SERVER_ERROR,
					finalData: {},
				});
			}
		});
	}

	async forgetPassword(payload) {
		let emailTemplates = new EmailTemplates();
		let common = new Common();
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
									let otpDetails = await this.#updateUserOTP(payload.email);

									let resetPasswordTemplate = emailTemplates.resetPassword(
										userDetails[0].name,
										otpDetails.otp
									);
									await common.sendEmailThroughSMTP(
										payload.email,
										subject,
										resetPasswordTemplate
									);

									finalData = { otpValidity: otpDetails.otpValidity };
								} else {
									finalData = { otpValidity: existingOTPValidity };
								}
							} else {
								let otpDetails = await this.#updateUserOTP(payload.email);

								let resetPasswordTemplate = emailTemplates.resetPassword(
									userDetails[0].name,
									otpDetails.otp
								);
								await common.sendEmailThroughSMTP(
									payload.email,
									subject,
									resetPasswordTemplate
								);

								finalData = { otpValidity: otpDetails.otpValidity };
							}

							resolve({
								response: ResponseMessages.RESET_PASSWORD_SUCCESS,
								finalData,
							});
						} else {
							resolve({
								response: ResponseMessages.NON_EXISTED_EMAIL,
								finalData: {},
							});
						}
					})
					.catch((err) => {
						console.log(err);
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

	async verifyOTP(payload) {
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
									response: ResponseMessages.VERIFIED_OTP,
									finalData: {},
								});
							} else {
								resolve({
									response: ResponseMessages.INVALID_OTP,
									finalData: {},
								});
							}
						}
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

	async updateUserPassword(payload) {
		const common = new Common();
		return new Promise(async (resolve, reject) => {
			try {
				let hashedPassword = common.generateHashPassword(payload.newPassword);

				await Users.update(
					{ password: hashedPassword },
					{ where: { email: payload.email } }
				)
					.then((data) => {
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

	async viewUserDetails(userDetails) {
		return new Promise((resolve, reject) => {
			try {
				Users.findOne({
					where: { id: userDetails.id },
					attributes: ['name', 'email', 'country_code', 'mobile_number'],
				})
					.then((userDetails) => {
						resolve({
							response: ResponseMessages.SUCCESS,
							finalData: { userDetails },
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

	async updateUserDetails(payload, userDetails) {
		return new Promise((resolve, reject) => {
			try {
				Users.findAll({
					where: { email: payload.email },
					attributes: ['email', 'name'],
				})
					.then(async (existingEmailDetails) => {
						let updateUserDetails = {};
						if (existingEmailDetails.length > 0) {
							updateUserDetails['name'] = payload.name;
							if (payload.touchedEmail) {
								updateUserDetails['email'] = payload.emaill;
							}
							await Users.update(updateUserDetails, {
								where: { id: userDetails.id },
							});

							let updatedUserDetails = await Users.findOne(
								{
									where: { id: userDetails.id },
								},
								{ attributes: ['email', 'name'] }
							);

							resolve({
								response: ResponseMessages.UPDATED_USER_DETAILS,
								finalData: {
									email: updatedUserDetails.email,
									name: updatedUserDetails.name,
								},
							});
						} else {
							await Users.update(
								{ name: payload.name },
								{ where: { id: userDetails.id } }
							);

							resolve({
								response: payload.touchedEmail
									? ResponseMessages.EXISTING_USER_EMAIL
									: ResponseMessages.SUCCESS,
								finalData: { name: payload.name },
							});
						}
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
