import Sequelize from 'sequelize';

class Admin extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'admin', sequelize, modelName: 'admin' }
		);
	}
}

export default Admin;
