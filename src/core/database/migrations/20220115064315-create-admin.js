'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('>>>yes');
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
          beforeCreate: function (user, options, fn) {
            user.created_at = new Date();
            user.updated_at = new Date();
            fn(null, person);
          },
          beforeUpdate: function (user, options, fn) {
            user.updated_at = new Date();
            fn(null, person);
          },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  },
};
