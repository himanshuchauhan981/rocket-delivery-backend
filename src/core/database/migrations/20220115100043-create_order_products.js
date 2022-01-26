'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('order_products', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'order_products',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        product_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        product_image: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        price: {
          type: Sequelize.INTEGER,
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
          beforeCreate: function (order_products, options, fn) {
            order_products.created_at = new Date();
            order_products.updated_at = new Date();
            fn(null, order_products);
          },
          beforeUpdate: function (order_products, options, fn) {
            order_products.updated_at = new Date();
            fn(null, order_products);
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
     * await queryInterface.dropTable('order_products');
     */

    await queryInterface.dropTable('order_products');
  },
};
