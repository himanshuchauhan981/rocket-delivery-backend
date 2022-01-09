import Sequelize from 'sequelize';

export default class MeasuringUnits extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				measuring_type: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				symbol: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				is_active: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 1,
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
			{
				timestamps: false,
				tableName: 'measuring_units',
				modelName: 'measuring_unit',
				sequelize,
			}
		);
	}
}
