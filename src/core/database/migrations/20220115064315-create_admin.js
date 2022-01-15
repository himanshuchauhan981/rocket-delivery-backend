'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(
      'admin',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        password: {
          type: Sequelize.STRING,
          allowNull: true,
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
          beforeCreate: function (admin, options, fn) {
            admin.created_at = new Date();
            admin.updated_at = new Date();
            fn(null, admin);
          },
          beforeUpdate: function (admin, options, fn) {
            admin.updated_at = new Date();
            fn(null, admin);
          },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  },
};
