import Sequelize from 'sequelize';

export default class SubCategories extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
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
				status: {
					type: DataTypes.STRING,
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
				tableName: 'sub_categories',
				sequelize,
				modelName: 'sub_categories',
			}
		);
	}
}
