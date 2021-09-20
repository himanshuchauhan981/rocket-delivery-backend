const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { connection } = require('../db');

let getSMTPKeys = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			let smtpKeys = {};
			let smtpKeysQuery =
				'SELECT settingsKey, settingsValue from settings where settingsKey = ? or settingsKey = ? or settingsKey = ? or settingsKey = ? or settingsKey = ?';
			let smtpKeysData = await connection.executeQuery(smtpKeysQuery, [
				'smtpHost',
				'smtpPort',
				'smtpEmail',
				'smtpPassword',
				'smtpService',
			]);

			for (let i = 0; i < smtpKeysData.length; i++) {
				smtpKeys[smtpKeysData[i].settingsKey] = smtpKeysData[i].settingsValue;
			}
			resolve(smtpKeys);
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
};

module.exports = commonFunctions;
