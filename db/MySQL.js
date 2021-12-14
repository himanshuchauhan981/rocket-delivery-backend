import Sequelize from 'sequelize';

import Settings from '../models/settings.js';
import Address from '../models/userAddress.js';
import Users from '../models/users.js';
import Categories from '../models/categories.js';
import MeasuringUnits from '../models/measuringUnits.js';
import OrderProducts from '../models/orderProducts.js';
import Orders from '../models/orders.js';
import ProductHistory from '../models/productHistory.js';
import ProductPrice from '../models/productPrice.js';
import ProductReview from '../models/productReview.js';
import ProductReviewImages from '../models/productReviewImages.js';
import Products from '../models/products.js';
import SubCategories from '../models/subCategories.js';
import Wishlist from '../models/wishlist.js';
import UserPayments from '../models/userPayments.js';
import Admin from '../models/admin.js';
import Image from '../models/image.js';
import BootStrap from '../config/bootstrap.js';

export default class MySQL {
	static async create() {
		try {
			const { SQL_DATABASE, SQL_USER, SQL_PASSWORD, SQL_HOST, SQL_DIALECT } =
				process.env;

			const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
				host: SQL_HOST,
				dialect: SQL_DIALECT,
			});
			const bootstrap = new BootStrap();

			await sequelize.authenticate(sequelize);
			await this.initiateModels(sequelize);
			await bootstrap.initiateAdminBootstrap();

			console.log('Sequelize connection is successfull');
		} catch (err) {
			console.log('Unable to connect to database', err);
		}
	}

	static async initiateModels(sequelize) {
		Users.init(sequelize, Sequelize);
		Settings.init(sequelize, Sequelize);
		Address.init(sequelize, Sequelize);
		Categories.init(sequelize, Sequelize);
		MeasuringUnits.init(sequelize, Sequelize);
		OrderProducts.init(sequelize, Sequelize);
		Orders.init(sequelize, Sequelize);
		ProductHistory.init(sequelize, Sequelize);
		ProductPrice.init(sequelize, Sequelize);
		ProductReview.init(sequelize, Sequelize);
		ProductReviewImages.init(sequelize, Sequelize);
		Products.init(sequelize, Sequelize);
		SubCategories.init(sequelize, Sequelize);
		Wishlist.init(sequelize, Sequelize);
		UserPayments.init(sequelize, Sequelize);
		Admin.init(sequelize, Sequelize);
		Image.init(sequelize, Sequelize);

		Address.belongsTo(Users, { foreignKey: 'user_id' });

		Categories.belongsTo(Image, { foreignKey: 'image_id' });

		SubCategories.belongsTo(Categories, { foreignKey: 'category_id' });

		Products.belongsTo(Categories, { foreignKey: 'category_id' });
		Products.belongsTo(SubCategories, { foreignKey: 'sub_category_id' });
		Products.belongsTo(MeasuringUnits, { foreignKey: 'measuring_unit_id' });
		Products.hasOne(ProductPrice, {
			foreignKey: 'id',
			targetKey: 'product_id',
		});
		Products.belongsTo(Image, { foreignKey: 'image_id' });

		ProductHistory.belongsTo(Products, { foreignKey: 'product_id' });
		ProductHistory.belongsTo(Users, { foreignKey: 'user_id' });
		ProductHistory.belongsTo(ProductPrice, {
			foreignKey: 'product_id',
			targetKey: 'product_id',
		});

		Orders.belongsTo(Users, { foreignKey: 'user_id' });
		Orders.belongsTo(Address, { foreignKey: 'user_address' });
		Orders.hasMany(OrderProducts, { foreignKey: 'order_id' });
		Orders.belongsTo(UserPayments, {
			foreignKey: 'payment_id',
			targetKey: 'payment_id',
		});

		Wishlist.belongsTo(Products, { foreignKey: 'product_id' });
		Wishlist.belongsTo(Users, { foreignKey: 'user_id' });

		OrderProducts.belongsTo(ProductReview, {
			foreignKey: 'product_id',
			targetKey: 'product_id',
		});

		ProductReview.belongsTo(Users, { foreignKey: 'user_id' });
		ProductReview.belongsTo(Orders, { foreignKey: 'order_id' });
	}
}
