import Sequelize from 'sequelize';

export default class Wishlist extends Sequelize.Model {
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
				user_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 0,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'wishlist', sequelize }
		);
	}
}
