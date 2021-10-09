module.exports = (sequelize, Sequelize) => {
	const UserAddress = sequelize.define(
		'address',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			full_name: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			pincode: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			house_no: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			area: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			landmark: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			latitude: {
				type: Sequelize.FLOAT(20, 16),
				required: true,
				allowNull: false,
			},
			longitude: {
				type: Sequelize.FLOAT(20, 16),
				required: true,
				allowNull: false,
			},
			country_code: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			mobile_number: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			is_deleted: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				required: true,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false,tableName:"address"}
	);

	return UserAddress;
};
