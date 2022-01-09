import Sequelize from 'sequelize';

export default class ProductHistory extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
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
				user_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				view_count: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 0,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'product_history', sequelize }
		);
	}
}
