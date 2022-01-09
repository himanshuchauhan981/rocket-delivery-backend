import Sequelize from 'sequelize';

class Products extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				name: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				image_id: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				category_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				sub_category_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: true,
				},
				is_active: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 1,
				},
				max_quantity: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				purchase_limit: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				measuring_unit_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				description: {
					type: DataTypes.TEXT,
					required: true,
					allowNull: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.INTEGER,
					required: false,
					defaultValue: 0,
				},
			},
			{
				timestamps: false,
				tableName: 'products',
				sequelize,
				modelName: 'product',
			}
		);
	}
}

export default Products;
