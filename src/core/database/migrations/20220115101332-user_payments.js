'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('user_payments', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'user_payments',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        payment_order_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        payment_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        card_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        card_type: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 0,
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
          beforeCreate: function (user_payments, options, fn) {
            user_payments.created_at = new Date();
            user_payments.updated_at = new Date();
            fn(null, user_payments);
          },
          beforeUpdate: function (user_payments, options, fn) {
            user_payments.updated_at = new Date();
            fn(null, user_payments);
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
     * await queryInterface.dropTable('user_payments');
     */

    await queryInterface.dropTable('user_payments');
  },
};
