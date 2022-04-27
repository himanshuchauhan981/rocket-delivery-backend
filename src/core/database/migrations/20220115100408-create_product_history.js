'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('product_history', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'product_history',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        product_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        view_count: {
          type: Sequelize.BIGINT,
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
          beforeCreate: function (product_history, options, fn) {
            product_history.created_at = new Date();
            product_history.updated_at = new Date();
            fn(null, product_history);
          },
          beforeUpdate: function (product_history, options, fn) {
            product_history.updated_at = new Date();
            fn(null, product_history);
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
     * await queryInterface.dropTable('product_history');
     */

    await queryInterface.dropTable('product_history');
  },
};
