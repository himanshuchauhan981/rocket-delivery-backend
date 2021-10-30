import Sequelize from 'sequelize';

export default class ProductReviewImages extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				image: {
					type: DataTypes.TEXT,
					required: true,
					allowNull: false,
				},
				review_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.INTEGER,
					defaultValue: 0,
					required: false,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'product_review_images', sequelize }
		);
	}
}
