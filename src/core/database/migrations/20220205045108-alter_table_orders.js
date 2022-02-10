'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.addColumn(
      'orders',
      'delivery_status', 
      { type: Sequelize.ENUM, values: ['PENDING', 'CONFIRMED', 'PICKED','ON_THE_WAY', 'DELIVERED'], defaultValue: 'PENDING'},
    );

    await queryInterface.addColumn(
      'orders',
      'payment_status',
      { type: Sequelize.ENUM, values: ['PAID', 'UNPAID'], defaultValue: 'UNPAID'},
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
