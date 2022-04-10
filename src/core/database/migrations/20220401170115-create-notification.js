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
      'notification',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        body: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        notification_type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['order_request', 'order_confirm', 'order_cancel'],
        },

        user_type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['user', 'admin'],
        },

        is_deleted: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },

        metadata: {
          type: Sequelize.JSON,
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
          beforeCreate: function (notification, options, fn) {
            notification.created_at = new Date();
            notification.updated_at = new Date();
            fn(null, notification);
          },
          beforeUpdate: function (notification, options, fn) {
            notification.updated_at = new Date();
            fn(null, notification);
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

    await queryInterface.dropTable('notification');
  },
};
