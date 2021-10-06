module.exports = (sequelize, Sequelize) => {
	const SubCategories = sequelize.define(
		'sub_categories',
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
			category_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
				references: {
					model: 'categories',
					key: 'id',
				},
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
		{ timestamps: false, tableName: 'sub_categories' }
	);

	return SubCategories;
};
