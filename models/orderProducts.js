module.exports = (sequelize, Sequelize) => {
	const OrderProducts = sequelize.define(
		'order_products',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			order_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			product_name: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			product_image: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			price: {
				type: Sequelize.FLOAT(20, 2),
				required: true,
				allowNull: false,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'order_products' }
	);

	return OrderProducts;
};
