/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('product_review', {
      type: 'FOREIGN KEY',
      fields: ['product_id'],
      name: 'fk_product_review_products',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('product_review', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      name: 'fk_product_review_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('product_review', {
      type: 'FOREIGN KEY',
      fields: ['order_id'],
      name: 'fk_product_review_orders',
      references: {
        table: 'orders',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'product_review',
      'fk_product_review_products',
      {},
    );

    await queryInterface.removeConstraint(
      'product_review',
      'fk_product_review_users',
      {},
    );

    await queryInterface.removeConstraint(
      'product_review',
      'fk_product_review_orders',
      {},
    );
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
