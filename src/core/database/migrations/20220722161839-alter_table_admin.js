'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(
      'admin',
      'latitude',
      {
        type: Sequelize.DECIMAL,
        defaultValue: 30.7322335,
      },
      {},
    );

    await queryInterface.addColumn(
      'admin',
      'longitude',
      {
        type: Sequelize.DECIMAL,
        defaultValue: 76.7815603,
      },
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('admin', 'latitude');

    await queryInterface.removeColumn('admin', 'longitude');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
