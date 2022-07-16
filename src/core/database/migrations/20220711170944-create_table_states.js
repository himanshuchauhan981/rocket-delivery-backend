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
      'states',
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

        country_id: {
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
          beforeCreate: function (states, options, fn) {
            states.created_at = new Date();
            states.updated_at = new Date();
            fn(null, states);
          },
          beforeUpdate: function (states, options, fn) {
            states.updated_at = new Date();
            fn(null, states);
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
    await queryInterface.dropTable('states');
  },
};
