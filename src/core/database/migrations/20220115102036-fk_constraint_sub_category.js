/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('sub_categories', {
      type: 'FOREIGN KEY',
      fields: ['category_id'],
      name: 'fk_subCategories_categories',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'sub_categories',
      'fk_subCategories_categories',
      {},
    );
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
