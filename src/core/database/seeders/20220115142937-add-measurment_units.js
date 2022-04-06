'use strict';

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkDelete('measuring_units', null, {});

    await queryInterface.bulkInsert(
      'measuring_units',
      [
        { id: 1, measuring_type: 'Kilogram', symbol: 'Kg' },
        { id: 2, measuring_type: 'Dozen', symbol: 'dz' },
        { id: 3, measuring_type: 'Unit', symbol: 'un' },
        { id: 4, measuring_type: 'Litres', symbol: 'L' },
      ],
      {},
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('measuring_units', null, {});
  },
};
