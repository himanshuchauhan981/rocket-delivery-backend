const { sequelize, Sequelize } = require('../db/connection');

const SubCategories = require('./subCategories')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);
const Address = require('./userAddress')(sequelize, Sequelize);

Categories.hasMany(SubCategories);

exports.Users = Users;
exports.Address = Address;
exports.Categories = Categories;
exports.SubCategories = SubCategories;
