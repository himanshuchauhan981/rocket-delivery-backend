/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('wishlist', {
      type: 'FOREIGN KEY',
      fields: ['product_id'],
      name: 'fk_wishlist_products',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('wishlist', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      name: 'fk_wishlist_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'wishlist',
      'fk_wishlist_products',
      {},
    );

    await queryInterface.removeConstraint('wishlist', 'fk_wishlist_users', {});
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
