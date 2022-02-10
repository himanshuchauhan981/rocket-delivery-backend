/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('orders', {
      type: 'FOREIGN KEY',
      fields: ['user_address'],
      name: 'fk_orders_user_address',
      references: {
        table: 'address',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('orders', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      name: 'fk_orders_user',
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
      'orders',
      'fk_orders_user_address',
      {},
    );

    await queryInterface.removeConstraint('orders', 'fk_orders_user', {});
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
