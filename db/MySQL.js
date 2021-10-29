import Sequelize from 'sequelize';

import Settings from '../models/settings.js';
import Users from '../models/users.js';

export default class MySQL {
	static async create() {
		try {
			const { SQL_DATABASE, SQL_USER, SQL_PASSWORD, SQL_HOST, SQL_DIALECT } =
				process.env;

			const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
				host: SQL_HOST,
				dialect: SQL_DIALECT,
			});

			await sequelize.authenticate(sequelize);
			await this.initiateModels(sequelize);

			console.log('Sequelize connection is successfull');
		} catch (err) {
			console.log('Unable to connect to database', err);
		}
	}

	static async initiateModels(sequelize) {
		Users.init(sequelize, Sequelize);
		Settings.init(sequelize, Sequelize);
	}
}
