/* eslint-disable prettier/prettier */
/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('address', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      name: 'fk_address_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('address', 'fk_address_users', {});
  },
};
// eslint-disable-next-line prettier/prettier
/* eslint-enable */
