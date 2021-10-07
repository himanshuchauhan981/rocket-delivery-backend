module.exports = (sequelize, Sequelize) => {
	const ProductHistory = sequelize.define(
		'product_history',
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
			user_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			is_deleted: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'product_history' }
	);

	return ProductHistory;
};
