import Sequelize from 'sequelize';

export default class MySQL {
	static async create() {
		try {
			const { SQL_DATABASE, SQL_USER, SQL_PASSWORD, SQL_HOST } = process.env;

			const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
				host: SQL_HOST,
				dialect: 'postgres',
			});

			await sequelize.authenticate();
			console.log('Sequelize connection is successfull');
		} catch (err) {
			console.log('Unable to connect to database');
		}
	}
}
