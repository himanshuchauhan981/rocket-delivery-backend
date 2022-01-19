'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('products', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'products',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        image_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        sub_category_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        max_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        purchase_limit: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        measuring_unit_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        is_active: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.BIGINT,
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
          beforeCreate: function (products, options, fn) {
            products.created_at = new Date();
            products.updated_at = new Date();
            fn(null, products);
          },
          beforeUpdate: function (products, options, fn) {
            products.updated_at = new Date();
            fn(null, products);
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
     * await queryInterface.dropTable('products');
     */

    await queryInterface.dropTable('products');
  },
};
