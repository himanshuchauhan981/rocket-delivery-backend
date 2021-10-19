module.exports = (sequelize, Sequelize) => {
	const ProductReview = sequelize.define(
		'product_review',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			headline: {
				type: Sequelize.TEXT,
				required: true,
				allowNull: false,
			},
			opinion: {
				type: Sequelize.TEXT,
				required: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			order_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			product_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			is_deleted: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				required: false,
				allowNull: false,
			},
			ratings: {
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
		{ timestamps: false, tableName: 'product_review' }
	);

	return ProductReview;
};
