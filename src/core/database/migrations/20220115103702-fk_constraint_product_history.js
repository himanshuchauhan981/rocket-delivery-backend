'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('product_history', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      name: 'fk_product_history_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('product_history', {
      type: 'FOREIGN KEY',
      fields: ['product_id'],
      name: 'fk_product_history_products',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'product_history',
      'fk_product_history_users',
      {},
    );

    await queryInterface.removeConstraint(
      'product_history',
      'fk_product_history_products',
      {},
    );
  },
};
