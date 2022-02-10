'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('settings', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'settings',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        settings_key: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        settings_value: {
          type: Sequelize.STRING,
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
          beforeCreate: function (settings, options, fn) {
            settings.created_at = new Date();
            settings.updated_at = new Date();
            fn(null, settings);
          },
          beforeUpdate: function (settings, options, fn) {
            settings.updated_at = new Date();
            fn(null, settings);
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
     * await queryInterface.dropTable('settings');
     */

    await queryInterface.dropTable('settings');
  },
};
