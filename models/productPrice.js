import Sequelize from 'sequelize';

export default class ProductPrice extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				product_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				actual_price: {
					type: DataTypes.FLOAT(10, 2),
					required: true,
					allowNull: false,
				},
				discount_percent: {
					type: DataTypes.FLOAT(10, 2),
					required: true,
					allowNull: false,
				},
				discount_start_date: {
					type: 'TIMESTAMP',
					allowNull: false,
				},
				discount_end_date: {
					type: 'TIMESTAMP',
					allowNull: false,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'product_price', sequelize }
		);
	}
}
