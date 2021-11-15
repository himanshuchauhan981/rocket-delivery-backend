import Admin from '../models/admin.js';
import Common from '../lib/commonFunctions.js';

export default class BootStrap {
	async initiateAdminBootstrap() {
		return new Promise(async (resolve, reject) => {
			try {
				let common = new Common();
				let adminDetails = await Admin.findAll();
				let hashedPassword = common.generateHashPassword('123456');

				if (!adminDetails.length) {
					Admin.create({
						email: 'rocketAdmin@yopmail.com',
						password: hashedPassword,
					});
				}
			} catch (err) {
				reject({});
			}
		});
	}
}
