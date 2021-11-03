import Sequelize from 'sequelize';

class Users extends Sequelize.Model {
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
					allowNull: false,
					required: true,
				},
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
				country_code: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				mobile_number: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				type: {
					type: DataTypes.STRING,
					allowNull: false,
					required: true,
				},
				is_active: {
					type: DataTypes.INTEGER,
					defaultValue: 1,
				},
				otp: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				otp_validity: {
					type: DataTypes.DATE,
					allowNull: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				fcm_token: {
					type: DataTypes.STRING,
					allowNull: true,
				},
			},
			{ timestamps: false, tableName: 'users', sequelize }
		);
	}
}

export default Users;
