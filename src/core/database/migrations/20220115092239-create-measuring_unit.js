'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('measuring_units', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'measuring_units',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        measuring_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        symbol: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        is_active: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.BIGINT,
          allowNull: true,
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
          beforeCreate: function (measuring_units, options, fn) {
            measuring_units.created_at = new Date();
            measuring_units.updated_at = new Date();
            fn(null, measuring_units);
          },
          beforeUpdate: function (measuring_units, options, fn) {
            measuring_units.updated_at = new Date();
            fn(null, measuring_units);
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

    await queryInterface.dropTable('measuring_units');
  },
};
