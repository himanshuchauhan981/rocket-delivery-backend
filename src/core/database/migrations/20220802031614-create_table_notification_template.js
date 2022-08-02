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
      'notification_template',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        slug: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        body: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        metadata: {
          type: Sequelize.JSON,
        },

        type: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        is_deleted: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

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
          beforeCreate: function (notification_template, options, fn) {
            notification_template.created_at = new Date();
            notification_template.updated_at = new Date();
            fn(null, notification_template);
          },
          beforeUpdate: function (notification_template, options, fn) {
            notification_template.updated_at = new Date();
            fn(null, notification_template);
          },
        },
      },
    );

    await queryInterface.changeColumn('notification_template', 'slug', {
      type: Sequelize.ENUM(
        'ORDER_REQUESTED',
        'ORDER_CONFIRMED',
        'ORDER_DELIVERED',
        'ORDER_CANCELLED',
        'DELIVERY_CONFIRMED',
        'DELIVERY_PICKED',
        'DELIVERY_ON_THE_WAY',
        'DELIVERY_COMPLETED',
      ),
    });

    await queryInterface.changeColumn('notification_template', 'type', {
      type: Sequelize.ENUM('ADMIN', 'USER'),
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('notification_template');
  },
};
