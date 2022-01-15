'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('address', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'address',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        full_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        pincode: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        house_no: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        area: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        landmark: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        latitude: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        longitude: {
          type: Sequelize.BIGINT,
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
          beforeCreate: function (address, options, fn) {
            address.created_at = new Date();
            address.updated_at = new Date();
            fn(null, address);
          },
          beforeUpdate: function (address, options, fn) {
            address.updated_at = new Date();
            fn(null, address);
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
     * await queryInterface.dropTable('address');
     */

    await queryInterface.dropTable('address');
  },
};
