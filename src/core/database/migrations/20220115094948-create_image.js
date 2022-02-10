'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('image', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'image',
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

        url: {
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
          beforeCreate: function (image, options, fn) {
            image.created_at = new Date();
            image.updated_at = new Date();
            fn(null, image);
          },
          beforeUpdate: function (image, options, fn) {
            image.updated_at = new Date();
            fn(null, image);
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
     * await queryInterface.dropTable('image');
     */

    await queryInterface.dropTable('image');
  },
};
