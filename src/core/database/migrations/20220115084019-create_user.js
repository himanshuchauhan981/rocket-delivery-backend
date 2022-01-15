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
      'users',
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
          allowNull: false,
        },

        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        country_code: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        mobile_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },

        otp: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        otp_validity: {
          type: Sequelize.DATE,
          allowNull: true,
        },

        profile_image: {
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
            fn(null, user);
          },
          beforeUpdate: function (user, options, fn) {
            user.updated_at = new Date();
            fn(null, user);
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
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  },
};
