'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('file', 'slug', {
      type: Sequelize.ENUM,
      values: ['category', 'sub-category', 'product'],
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface
      .removeColumn('file', 'slug')
      .then(
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_file_slug";'),
      );
  },
};
