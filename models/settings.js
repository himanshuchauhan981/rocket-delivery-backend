import Sequelize from 'sequelize';

class Settings extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				settings_key: {
					type: Sequelize.STRING,
					required: true,
					allowNull: false,
				},
				settings_value: {
					type: Sequelize.STRING,
					required: true,
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'settings', sequelize }
		);
	}
}

export default Settings;
