'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('products', 'payment_method', {
      type: Sequelize.ENUM,
      values: ['CASH_ON_DELIVERY', 'DEBIT_OR_CREDIT', 'BOTH'],
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('products', 'payment_method');
  },
};
