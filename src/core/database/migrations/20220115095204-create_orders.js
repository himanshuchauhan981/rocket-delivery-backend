'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('orders', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'orders',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        order_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        delivery_charges: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        payment_method: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        net_amount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        user_address: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        delivery_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        user_payment_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
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
          beforeCreate: function (orders, options, fn) {
            orders.created_at = new Date();
            orders.updated_at = new Date();
            fn(null, orders);
          },
          beforeUpdate: function (orders, options, fn) {
            orders.updated_at = new Date();
            fn(null, orders);
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
     * await queryInterface.dropTable('orders');
     */

    await queryInterface.dropTable('orders');
  },
};
