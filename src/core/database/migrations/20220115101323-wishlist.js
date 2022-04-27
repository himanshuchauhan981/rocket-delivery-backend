'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('wishlist', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      'wishlist',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        product_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        user_id: {
          type: Sequelize.BIGINT,
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
          beforeCreate: function (wishlist, options, fn) {
            wishlist.created_at = new Date();
            wishlist.updated_at = new Date();
            fn(null, wishlist);
          },
          beforeUpdate: function (wishlist, options, fn) {
            wishlist.updated_at = new Date();
            fn(null, wishlist);
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
     * await queryInterface.dropTable('wishlist');
     */

    await queryInterface.dropTable('wishlist');
  },
};
