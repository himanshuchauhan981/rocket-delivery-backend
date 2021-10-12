const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const moment = require('moment');

const { Settings } = require('../models');

let getSMTPKeys = async () => {
	return new Promise((resolve, reject) => {
		try {
			let smtpKeys = {};
			Settings.findAll({
				where: {
					[Op.or]: [
						{ settings_key: 'smtpHost' },
						{ settings_key: 'smtpPort' },
						{ settings_key: 'smtpEmail' },
						{ settings_key: 'smtpPassword' },
						{ settings_key: 'smtpService' },
					],
				},
				attribute: [
					['settings_key', 'settingsKey'],
					['settings_value', 'settingsValue'],
				],
			})
				.then((smtpKeysData) => {
					for (let i = 0; i < smtpKeysData.length; i++) {
						smtpKeys[smtpKeysData[i].settingsKey] =
							smtpKeysData[i].settingsValue;
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

const commonFunctions = {
	generateHashPassword: (password) => {
		let salt = bcryptjs.genSaltSync(10);
		let hash = bcryptjs.hashSync(password, salt);
		return hash;
	},

	generateJWTToken: (userData) => {
		let privateJWTKey = process.env.JWT_KEY;
		let token = jwt.sign(userData, privateJWTKey, { expiresIn: '24h' });
		return token;
	},

	compareHashedPassword: (passwordString, hashedPassword) => {
		return bcryptjs.compareSync(passwordString, hashedPassword);
	},

	sendEmailThroughSMTP: async (receiver, subject, emailContent) => {
		return new Promise(async (resolve, reject) => {
			try {
				let smtpKeys = await getSMTPKeys();
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
	},

	generateOTP: () => {
		let otp = otpGenerator.generate(6, {
			digits: true,
			alphabets: false,
			upperCase: false,
			specialChars: false,
		});

		return otp;
	},
};

module.exports = commonFunctions;
