module.exports = (sequelize, Sequelize) => {
	const Products = sequelize.define(
		'products',
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
			},
			sub_category_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				required: true,
				allowNull: false,
			},
			max_quantity: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			purchase_limit: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			measuring_unit_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			pre_selected_quantity: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			price_id: {
				type: Sequelize.INTEGER,
				required: true,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
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

	return Products;
};
