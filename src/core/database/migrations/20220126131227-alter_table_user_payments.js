'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('user_payments', 'status', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('user_payments', 'status', {
      type: Sequelize.ENUM,
      values: ['INITIATED', 'CAPTURED', 'REFUNDED']
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
