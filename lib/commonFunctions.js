import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import sequelize from 'sequelize';

import Settings from '../models/settings.js';

export default class Common {
	#getSMTPKeys = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				let smtpKeys = {};
				Settings.findAll({
					where: {
						[sequelize.Op.or]: [
							{ settings_key: 'smtpHost' },
							{ settings_key: 'smtpPort' },
							{ settings_key: 'smtpEmail' },
							{ settings_key: 'smtpPassword' },
							{ settings_key: 'smtpService' },
						],
					},
				})
					.then((smtpKeysData) => {
						for (let i = 0; i < smtpKeysData.length; i++) {
							smtpKeys[smtpKeysData[i].settings_key] =
								smtpKeysData[i].settings_value;
						}
						resolve(smtpKeys);
					})
					.catch((err) => {
						reject(err);
					});
			} catch (err) {
				reject(err);
			}
		});
	};

	generateHashPassword(password) {
		let salt = bcryptjs.genSaltSync(10);
		let hash = bcryptjs.hashSync(password, salt);
		return hash;
	}

	compareHashedPassword(passwordString, hashedPassword) {
		return bcryptjs.compareSync(passwordString, hashedPassword);
	}

	generateJWTToken(userData) {
		let privateJWTKey = process.env.JWT_KEY;
		let token = jwt.sign(userData, privateJWTKey, { expiresIn: '24h' });
		return token;
	}

	async sendEmailThroughSMTP(receiver, subject, emailContent) {
		return new Promise(async (resolve, reject) => {
			try {
				let smtpKeys = await this.#getSMTPKeys();
				let transporter = nodemailer.createTransport({
					service: smtpKeys.smtpService,
					host: smtpKeys.smtpHost,
					port: smtpKeys.smtpPort,
					auth: {
						user: smtpKeys.smtpEmail,
						pass: smtpKeys.smtpPassword,
					},
				});

				let mailOptions = {
					from: smtpKeys.smtpEmail,
					to: receiver,
					subject,
					html: emailContent,
				};

				transporter.sendMail(mailOptions, (err, info) => {
					if (err) {
						reject(err);
					} else {
						resolve(null);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	generateOTP() {
		let otp = otpGenerator.generate(6, {
			digits: true,
			alphabets: false,
			upperCase: false,
			specialChars: false,
		});

		return otp;
	}

	async getRazorPayKeys() {
		return new Promise((resolve, reject) => {
			try {
				let razorpayKeys = {};
				Settings.findAll({
					where: {
						[Op.or]: [
							{ settings_key: 'razorpayKey' },
							{ settings_key: 'razorpaySecret' },
						],
					},
				})
					.then((razorpayKeysData) => {
						for (let i = 0; i < razorpayKeysData.length; i++) {
							razorpayKeys[razorpayKeysData[i].settings_key] =
								razorpayKeysData[i].settings_value;
						}
						resolve(razorpayKeys);
					})
					.catch((err) => {
						reject(err);
					});
			} catch (err) {
				reject(err);
			}
		});
	}
}

// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');
// const sequelize = require('sequelize');
// const Op = sequelize.Op;
// const moment = require('moment');
// const FCM = require('fcm-node');

// const { Settings } = require('../models');

// let getSMTPKeys = async () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let smtpKeys = {};
// 			Settings.findAll({
// 				where: {
// 					[Op.or]: [
// 						{ settings_key: 'smtpHost' },
// 						{ settings_key: 'smtpPort' },
// 						{ settings_key: 'smtpEmail' },
// 						{ settings_key: 'smtpPassword' },
// 						{ settings_key: 'smtpService' },
// 					],
// 				},
// 				attribute: [
// 					['settings_key', 'settingsKey'],
// 					['settings_value', 'settingsValue'],
// 				],
// 			})
// 				.then((smtpKeysData) => {
// 					for (let i = 0; i < smtpKeysData.length; i++) {
// 						smtpKeys[smtpKeysData[i].settingsKey] =
// 							smtpKeysData[i].settingsValue;
// 					}
// 					resolve(smtpKeys);
// 				})
// 				.catch((err) => {
// 					reject(err);
// 				});
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// };

// let getFcmKey = async () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let fcmKey = {};
// 			Settings.findAll({
// 				where: { settings_key: 'fcmServerKey' },
// 				attribute: ['settings_key', 'settings_value'],
// 			})
// 				.then((fcmKeyData) => {
// 					for (let i = 0; i < fcmKeyData.length; i++) {
// 						fcmKey[fcmKeyData[i].settings_key] = fcmKeyData[i].settings_value;
// 					}
// 					resolve(fcmKey);
// 				})
// 				.catch((err) => {
// 					reject(err);
// 				});
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// };

// const commonFunctions = {
// 	generateHashPassword: (password) => {
// 		let salt = bcryptjs.genSaltSync(10);
// 		let hash = bcryptjs.hashSync(password, salt);
// 		return hash;
// 	},

// 	generateJWTToken: (userData) => {
// 		let privateJWTKey = process.env.JWT_KEY;
// 		let token = jwt.sign(userData, privateJWTKey, { expiresIn: '24h' });
// 		return token;
// 	},

// 	compareHashedPassword: (passwordString, hashedPassword) => {
// 		return bcryptjs.compareSync(passwordString, hashedPassword);
// 	},

// 	sendEmailThroughSMTP: async (receiver, subject, emailContent) => {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let smtpKeys = await getSMTPKeys();
// 				let transporter = nodemailer.createTransport({
// 					service: smtpKeys.smtpService,
// 					host: smtpKeys.smtpHost,
// 					port: smtpKeys.smtpPort,
// 					auth: {
// 						user: smtpKeys.smtpEmail,
// 						pass: smtpKeys.smtpPassword,
// 					},
// 				});

// 				let mailOptions = {
// 					from: smtpKeys.smtpEmail,
// 					to: receiver,
// 					subject,
// 					html: emailContent,
// 				};

// 				transporter.sendMail(mailOptions, (err, info) => {
// 					if (err) {
// 						reject(err);
// 					} else {
// 						resolve(null);
// 					}
// 				});
// 			} catch (err) {
// 				reject(err);
// 			}
// 		});
// 	},

// 	generateOTP: () => {
// 		let otp = otpGenerator.generate(6, {
// 			digits: true,
// 			alphabets: false,
// 			upperCase: false,
// 			specialChars: false,
// 		});

// 		return otp;
// 	},

// 	calculateDiscountPrice: (
// 		start_date,
// 		end_date,
// 		discount_percent,
// 		actual_price
// 	) => {
// 		let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
// 		let discountStartDate = moment(start_date).format('YYYY-MM-DD HH:mm:ss');
// 		let discountEndDate = moment(end_date).format('YYYY-MM-DD HH:mm:ss');
// 		let discountStatus;
// 		let discountPrice;

// 		if (discountStartDate <= currentDate && discountEndDate >= currentDate) {
// 			discountStatus = true;
// 			discountPrice = (discount_percent / 100) * actual_price;
// 			discountPrice = actual_price - discountPrice;
// 			return {
// 				discountPrice,
// 				discountStatus,
// 			};
// 		} else {
// 			discountStatus = false;
// 			discountPrice = 0;
// 			return { discountStatus, discountPrice };
// 		}
// 	},

// 	getRazorPayKeys: async () => {
// 		return new Promise((resolve, reject) => {
// 			try {
// 				let razorpayKeys = {};
// 				Settings.findAll({
// 					where: {
// 						[Op.or]: [
// 							{ settings_key: 'razorpayKey' },
// 							{ settings_key: 'razorpaySecret' },
// 						],
// 					},
// 				})
// 					.then((razorpayKeysData) => {
// 						for (let i = 0; i < razorpayKeysData.length; i++) {
// 							razorpayKeys[razorpayKeysData[i].settings_key] =
// 								razorpayKeysData[i].settings_value;
// 						}
// 						resolve(razorpayKeys);
// 					})
// 					.catch((err) => {
// 						reject(err);
// 					});
// 			} catch (err) {
// 				reject(err);
// 			}
// 		});
// 	},

// 	sendFcmPushNofication: async (
// 		fcmToken,
// 		notificationTitle,
// 		notificationBody
// 	) => {
// 		return new Promise(async (resolve, reject) => {
// 			let fcmKey = await getFcmKey();

// 			let fcm = new FCM(fcmKey.fcmServerKey);

// 			let message = {
// 				to: fcmToken,
// 				notification: {
// 					title: notificationTitle,
// 					body: notificationBody,
// 				},
// 			};

// 			fcm.send(message, (err, response) => {
// 				resolve();
// 			});
// 		});
// 	},
// };

// module.exports = commonFunctions;
