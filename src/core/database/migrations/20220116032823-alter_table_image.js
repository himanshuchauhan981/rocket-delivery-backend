'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.renameTable('image', 'file');

    await queryInterface.renameColumn('file', 'type', 'slug');

    await queryInterface.addColumn(
      'file',
      'type',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      {
        after: 'slug',
      },
    );

    await queryInterface.bulkUpdate('file', { type: 'image' }, {});
  },

  async down(queryInterface) {
    await queryInterface.renameTable('file', 'image');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
