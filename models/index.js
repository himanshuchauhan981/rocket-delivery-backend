const { sequelize, Sequelize } = require('../db/connection');

exports.Users = require('./users')(sequelize, Sequelize);
exports.Address = require('./userAddress')(sequelize, Sequelize);
