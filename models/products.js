import Sequelize from 'sequelize';

export default class Products extends Sequelize.Model {
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
				image: {
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
					allowNull: false,
				},
				status: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
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
				pre_selected_quantity: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				price_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				description: {
					type: DataTypes.TEXT,
					required: true,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'products', sequelize }
		);
	}
}
