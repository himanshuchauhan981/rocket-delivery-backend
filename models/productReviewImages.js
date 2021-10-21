module.exports = (sequelize, Sequelize) => {
	const ProductReviewImages = sequelize.define(
		'product_review_images',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			image: {
				type: Sequelize.TEXT,
				required: true,
				allowNull: false,
			},
			review_id: {
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
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'product_review_images' }
	);

	return ProductReviewImages;
};
