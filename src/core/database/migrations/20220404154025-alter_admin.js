'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('admin', 'super_admin', {
      type: Sequelize.INTEGER,
      defaultValue: 1,

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('admin', 'super_admin');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
