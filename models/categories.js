import Sequelize from 'sequelize';

class Categories extends Sequelize.Model {
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
				is_active: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 0,
				},
				is_sub_category: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.INTEGER,
					required: true,
					defaultValue: 0,
				},
			},
			{
				timestamps: false,
				tableName: 'categories',
				sequelize,
				modelName: 'categories',
			}
		);
	}
}

export default Categories;
