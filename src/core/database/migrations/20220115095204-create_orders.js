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
          type: Sequelize.BIGINT,
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
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        status: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        delivery_charges: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        payment_method: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        net_amount: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },

        user_address: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        delivery_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        payment_id: {
          type: Sequelize.DATE,
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
