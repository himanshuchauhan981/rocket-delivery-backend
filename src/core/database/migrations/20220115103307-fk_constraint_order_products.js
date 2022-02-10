/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('order_products', {
      type: 'FOREIGN KEY',
      fields: ['order_id'],
      name: 'fk_order_products_orders',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('order_products', {
      type: 'FOREIGN KEY',
      fields: ['product_id'],
      name: 'fk_order_products_products',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'order_products',
      'fk_order_products_orders',
      {},
    );

    await queryInterface.removeConstraint(
      'order_products',
      'fk_order_products_products',
      {},
    );
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
