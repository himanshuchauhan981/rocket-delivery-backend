'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'minimum_cart_quantity', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('products', 'maximum_cart_quantity', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('products', 'stock_visibility', {
      type: Sequelize.ENUM,
      values: ['STOCK_QUANTITY', 'STOCK_TEXT', 'HIDE_STOCK'],
    });

    await queryInterface.removeColumn('products', 'purchase_limit');

    // await queryInterface.removeColumn('products', 'description');

    await queryInterface.addColumn('products', 'description_id', {
      type: Sequelize.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'purchase_limit', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.removeColumn('products', 'minumum_cart_quantity');

    await queryInterface.removeColumn('products', 'maximum_cart_quantity');

    await queryInterface.removeColumn('products', 'stock_visibility');

    await queryInterface.removeColumn('products', 'description_id');

    await queryInterface.removeColumn('products', 'refundable');

    await queryInterface.removeColumn('products', 'description_id');

    await queryInterface.addColumn('products', 'description', {
      type: Sequelize.STRING,
    });
  },
};
