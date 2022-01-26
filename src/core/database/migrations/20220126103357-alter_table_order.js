'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('orders', 'status', {
      type: Sequelize.ENUM,
      values: ['REQUESTED', 'CONFIRMED', 'DELIVERED', 'CANCELLED']
    });
  },

  async down(queryInterface, Sequelize) {

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
