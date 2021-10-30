import Sequelize from 'sequelize';

class Address extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				user_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				full_name: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				pincode: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				house_no: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				area: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				city: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				state: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				landmark: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				latitude: {
					type: DataTypes.FLOAT(20, 16),
					required: true,
					allowNull: false,
				},
				longitude: {
					type: DataTypes.FLOAT(20, 16),
					required: true,
					allowNull: false,
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
				is_deleted: {
					type: DataTypes.INTEGER,
					defaultValue: 0,
					required: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'address', sequelize }
		);
	}
}

export default Address;
