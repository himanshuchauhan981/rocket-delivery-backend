module.exports = (sequelize, Sequelize) => {
	const ProductPrice = sequelize.define(
		'product_price',
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
			actual_price: {
				type: Sequelize.FLOAT(10, 2),
				required: true,
				allowNull: false,
			},
			discount_percent: {
				type: Sequelize.FLOAT(10, 2),
				required: true,
				allowNull: false,
			},
			discount_start_date: {
				type: 'TIMESTAMP',
				allowNull: false,
			},
			discount_end_date: {
				type: 'TIMESTAMP',
				allowNull: false,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'product_price' }
	);

	return ProductPrice;
};
