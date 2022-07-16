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
      'cities',
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

        state_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        is_active: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
          beforeCreate: function (cities, options, fn) {
            cities.created_at = new Date();
            cities.updated_at = new Date();
            fn(null, cities);
          },
          beforeUpdate: function (cities, options, fn) {
            cities.updated_at = new Date();
            fn(null, cities);
          },
        },
      },
    );
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('cities');
  },
};
