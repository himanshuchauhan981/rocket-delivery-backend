const { sequelize, Sequelize } = require('../db/connection');

const SubCategories = require('./subCategories')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);
const Address = require('./userAddress')(sequelize, Sequelize);
const Products = require('./products')(sequelize, Sequelize);
const MeasuringUnits = require('./measuringUnits')(sequelize, Sequelize);
const ProductPrice = require('./productPrice')(sequelize, Sequelize);

SubCategories.belongsTo(Categories, { foreignKey: 'category_id' });

Products.belongsTo(Categories, { foreignKey: 'category_id' });

Products.belongsTo(SubCategories, { foreignKey: 'sub_category_id' });

Products.belongsTo(MeasuringUnits, { foreignKey: 'measuring_unit_id' });

Products.belongsTo(ProductPrice, { foreignKey: 'price_id' });

Categories.hasMany(SubCategories);

exports.Users = Users;
exports.Address = Address;
exports.Categories = Categories;
exports.SubCategories = SubCategories;
exports.Products = Products;
exports.ProductPrice = ProductPrice;
exports.MeasuringUnits = MeasuringUnits;
