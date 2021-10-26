module.exports = (sequelize, Sequelize) => {
	const Categories = sequelize.define(
		'categories',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			status: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			is_sub_category: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{ timestamps: false, tableName: 'categories' }
	);

	return Categories;
};
