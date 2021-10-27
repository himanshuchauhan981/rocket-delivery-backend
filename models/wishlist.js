module.exports = (sequelize, Sequelize) => {
	const Wishlist = sequelize.define(
		'wishlist',
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
				defaultValue: 0,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'wishlist' }
	);

	return Wishlist;
};
