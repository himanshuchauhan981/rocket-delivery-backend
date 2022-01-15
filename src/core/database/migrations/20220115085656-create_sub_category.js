'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('sub_categories', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'sub_categories',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        category_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        image_id: {
          type: Sequelize.BIGINT,
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
          beforeCreate: function (sub_category, options, fn) {
            sub_category.created_at = new Date();
            sub_category.updated_at = new Date();
            fn(null, sub_category);
          },
          beforeUpdate: function (sub_category, options, fn) {
            sub_category.updated_at = new Date();
            fn(null, sub_category);
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
     * await queryInterface.dropTable('sub_categories');
     */

    await queryInterface.dropTable('sub_categories');
  },
};
