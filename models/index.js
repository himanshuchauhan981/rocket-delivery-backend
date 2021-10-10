const { sequelize, Sequelize } = require('../db/connection');

const SubCategories = require('./subCategories')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);
const Address = require('./userAddress')(sequelize, Sequelize);
const Products = require('./products')(sequelize, Sequelize);
const MeasuringUnits = require('./measuringUnits')(sequelize, Sequelize);
const ProductPrice = require('./productPrice')(sequelize, Sequelize);
const ProductHistory = require('./productHistory')(sequelize, Sequelize);
const Orders = require('./orders')(sequelize, Sequelize);
const OrderProducts = require('./orderProducts')(sequelize, Sequelize);
const Wishlist = require('./wishlist')(sequelize, Sequelize);
const Settings = require('./settings')(sequelize, Sequelize);

SubCategories.belongsTo(Categories, { foreignKey: 'category_id' });

Products.belongsTo(Categories, { foreignKey: 'category_id' });
Products.belongsTo(SubCategories, { foreignKey: 'sub_category_id' });
Products.belongsTo(MeasuringUnits, { foreignKey: 'measuring_unit_id' });
Products.belongsTo(ProductPrice, { foreignKey: 'price_id' });

ProductHistory.belongsTo(Products, { foreignKey: 'product_id' });
ProductHistory.belongsTo(Users, { foreignKey: 'user_id' });
ProductHistory.belongsTo(ProductPrice, {
	foreignKey: 'product_id',
	targetKey: 'product_id',
});

Orders.belongsTo(Users, { foreignKey: 'user_id' });
Orders.belongsTo(Address, { foreignKey: 'user_address' });
Orders.hasMany(OrderProducts, { foreignKey: 'order_id' });

Wishlist.belongsTo(Products, { foreignKey: 'product_id' });
Wishlist.belongsTo(Users, { foreignKey: 'user_id' });

exports.Users = Users;
exports.Address = Address;
exports.Categories = Categories;
exports.SubCategories = SubCategories;
exports.Products = Products;
exports.ProductPrice = ProductPrice;
exports.MeasuringUnits = MeasuringUnits;
exports.ProductHistory = ProductHistory;
exports.Orders = Orders;
exports.OrderProducts = OrderProducts;
exports.Wishlist = Wishlist;
exports.Settings = Settings;
