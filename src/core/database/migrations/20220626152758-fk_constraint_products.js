'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('products', {
      type: 'FOREIGN KEY',
      fields: ['description_id'],
      name: 'fk_products_product_description',
      references: {
        table: 'product_description',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'products',
      'fk_products_product_description',
      {},
    );
  },
};
