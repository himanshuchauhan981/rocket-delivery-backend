module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define(
		'users',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
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
			type: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			is_active: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
			},
			otp: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			otp_validity: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
			fcm_token: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		},
		{ timestamps: false }
	);

	return Users;
};
