module.exports = (sequelize, Sequelize) => {
	const Orders = sequelize.define(
		'orders',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			order_number: {
				type: Sequelize.STRING,
				required: true,
				allowNull: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			status: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			delivery_charges: {
				type: Sequelize.FLOAT(20, 2),
				required: true,
				allowNull: true,
			},
			payment_method: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			payment_id: {
				type: Sequelize.STRING,
				required: false,
				allowNull: true,
			},
			amount: {
				type: Sequelize.FLOAT(20, 2),
				required: true,
				allowNull: false,
			},
			net_amount: {
				type: Sequelize.FLOAT(20, 2),
				required: true,
				allowNull: true,
			},
			user_address: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			delivery_date: {
				type: 'TIMESTAMP',
				allowNull: true,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'orders' }
	);

	return Orders;
};
