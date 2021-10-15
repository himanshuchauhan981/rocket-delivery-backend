module.exports = (sequelize, Sequelize) => {
	const UserPayments = sequelize.define(
		'user_payments',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			payment_order_id: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			payment_id: {
				type: Sequelize.STRING,
				required: false,
				allowNull: true,
			},
			status: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				required: true,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
			card_number: {
				type: Sequelize.STRING,
				required: false,
				allowNull: true,
			},
			card_type: {
				type: Sequelize.STRING,
				required: false,
				allowNull: true,
			},
		},
		{ timestamps: false, tableName: 'user_payments' }
	);

	return UserPayments;
};
