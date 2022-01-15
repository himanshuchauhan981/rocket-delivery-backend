/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('products', {
      type: 'FOREIGN KEY',
      fields: ['measuring_unit_id'],
      name: 'fk_products_measuring_unit',
      references: {
        table: 'measuring_units',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('products', {
      type: 'FOREIGN KEY',
      fields: ['sub_category_id'],
      name: 'fk_products_sub_categories',
      references: {
        table: 'sub_categories',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('products', {
      type: 'FOREIGN KEY',
      fields: ['category_id'],
      name: 'fk_products_categories',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'products',
      'fk_products_measuring_unit',
      {},
    );

    await queryInterface.removeConstraint(
      'products',
      'fk_products_sub_categories',
      {},
    );

    await queryInterface.removeConstraint(
      'products',
      'fk_products_categories',
      {},
    );
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
