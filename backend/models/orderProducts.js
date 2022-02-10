import Sequelize from 'sequelize';

export default class OrderProducts extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				product_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				order_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				product_name: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				product_image: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				quantity: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				price: {
					type: DataTypes.FLOAT(20, 2),
					required: true,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{
				timestamps: false,
				tableName: 'order_products',
				modelName: 'order_products',
				sequelize,
			}
		);
	}
}
