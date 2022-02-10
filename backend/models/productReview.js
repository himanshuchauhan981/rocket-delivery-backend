import Sequelize from 'sequelize';

export default class ProductReview extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				headline: {
					type: DataTypes.TEXT,
					required: true,
					allowNull: false,
				},
				opinion: {
					type: DataTypes.TEXT,
					required: true,
					allowNull: false,
				},
				user_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				order_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				product_id: {
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
				ratings: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				review_images: { type: DataTypes.VIRTUAL },
			},
			{
				timestamps: false,
				tableName: 'product_review',
				sequelize,
				modelName: 'product_review',
			}
		);
	}
}
