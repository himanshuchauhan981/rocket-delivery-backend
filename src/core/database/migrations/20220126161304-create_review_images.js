'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('product_review_file', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'product_review_file',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

        review_id: {
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
     * await queryInterface.dropTable('product_review_file');
     */

    await queryInterface.dropTable('product_review_file');
  },
};
