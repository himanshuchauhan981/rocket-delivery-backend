'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('categories', 'is_active', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });

    await queryInterface.changeColumn('categories', 'is_deleted', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });

    await queryInterface.changeColumn('categories', 'is_sub_category', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
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
