'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('file', 'extension', {
      type: Sequelize.ENUM('jpg', 'jpeg', 'png'),
      allowNull: false,
    });

    await queryInterface.addColumn('file', 'size', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('file', 'extension');

    await queryInterface.removeColumn('file', 'size');
  },
};
