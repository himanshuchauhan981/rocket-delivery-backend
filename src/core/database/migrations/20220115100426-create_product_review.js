'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('product_review', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'product_review',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        headline: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        opinion: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },

        ratings: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        order_id: {
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
          beforeCreate: function (product_review, options, fn) {
            product_review.created_at = new Date();
            product_review.updated_at = new Date();
            fn(null, product_review);
          },
          beforeUpdate: function (product_review, options, fn) {
            product_review.updated_at = new Date();
            fn(null, product_review);
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
     * await queryInterface.dropTable('product_review');
     */

    await queryInterface.dropTable('product_review');
  },
};
