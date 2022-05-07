'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'categories',
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
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        is_sub_category: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        is_active: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.INTEGER,
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
          beforeCreate: function (category, options, fn) {
            category.created_at = new Date();
            category.updated_at = new Date();
            fn(null, user);
          },
          beforeUpdate: function (category, options, fn) {
            category.updated_at = new Date();
            fn(null, category);
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
     * await queryInterface.dropTable('categories');
     */

    await queryInterface.dropTable('categories');
  },
};
