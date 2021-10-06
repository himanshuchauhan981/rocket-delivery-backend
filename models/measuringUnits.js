module.exports = (sequelize, Sequelize) => {
	const MeasuringUnits = sequelize.define(
		'measuring_units',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			measuring_type: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			symbol: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			status: {
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
		{ timestamps: false, tableName: 'measuring_units' }
	);

	return MeasuringUnits;
};
