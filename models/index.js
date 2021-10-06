const { sequelize, Sequelize } = require('../db/connection');

const SubCategories = require('./subCategories')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);
const Address = require('./userAddress')(sequelize, Sequelize);
const Products = require('./products')(sequelize, Sequelize);
const MeasuringUnits = require('./measuringUnits')(sequelize, Sequelize);

SubCategories.belongsTo(Categories, {
	foreignKey: 'category_id',
	targetKey: 'id',
});

Products.belongsTo(Categories, {
	foreignKey: 'category_id',
	targetKey: 'id',
});

Products.belongsTo(SubCategories, {
	foreignKey: 'sub_category_id',
	targetKey: 'id',
});

Products.belongsTo(MeasuringUnits, {
	foreignKey: 'measuring_unit_id',
	targetKey: 'id',
});

Categories.hasMany(SubCategories);

exports.Users = Users;
exports.Address = Address;
exports.Categories = Categories;
exports.SubCategories = SubCategories;
exports.Products = Products;
