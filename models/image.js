import Sequelize from 'sequelize';

class Image extends Sequelize.Model {
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
				url: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				type: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				is_deleted: {
					type: DataTypes.STRING,
					defaultValue: 0,
					required: true,
				},
			},
			{
				timestamps: false,
				tableName: 'image',
				modelName: 'image',
				sequelize,
				freezeTableName: true,
			}
		);
	}
}

export default Image;
