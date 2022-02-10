'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('product_price', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'product_price',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        actual_price: {
          type: Sequelize.DOUBLE(2,2),
          allowNull: false,
        },

        discount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        discount_start_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        discount_end_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        discount_type: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        refundable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },

        // Timestamps
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },

        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: function (product_price, options, fn) {
            product_price.created_at = new Date();
            product_price.updated_at = new Date();
            fn(null, product_price);
          },
          beforeUpdate: function (product_price, options, fn) {
            product_price.updated_at = new Date();
            fn(null, product_price);
          },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('product_price');
     */

    await queryInterface.dropTable('product_price');
  },
};
