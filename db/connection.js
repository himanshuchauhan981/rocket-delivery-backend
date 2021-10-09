const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.SQL_DATABASE,
	process.env.SQL_USER,
	process.env.SQL_PASSWORD,
	{ host: process.env.SQL_HOST, dialect: 'postgres' }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
