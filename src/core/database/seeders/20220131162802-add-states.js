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

    await queryInterface.bulkDelete('states', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });

    let [countryDetails] = await queryInterface.rawSelect(
      'countries',
      { where: { iso_code: 'US' }, plain: false },
      ['id'],
    );

    let statesList = [
      { country_id: countryDetails.id, name: 'Alabama', is_active: 1 },
      { country_id: countryDetails.id, name: 'Howland Island', is_active: 1 },
      { country_id: countryDetails.id, name: 'Florida', is_active: 1 },
      { country_id: countryDetails.id, name: 'Georgia', is_active: 1 },
      { country_id: countryDetails.id, name: 'Idaho', is_active: 1 },
    ];

    [countryDetails] = await queryInterface.rawSelect(
      'countries',
      { where: { iso_code: 'CA' }, plain: false },
      ['id'],
    );

    statesList = [
      ...statesList,
      { country_id: countryDetails.id, name: 'British Columbia', is_active: 1 },
      { country_id: countryDetails.id, name: 'Manitoba', is_active: 1 },
      { country_id: countryDetails.id, name: 'Ontario', is_active: 1 },
    ];

    [countryDetails] = await queryInterface.rawSelect(
      'countries',
      { where: { iso_code: 'IN' }, plain: false },
      ['id'],
    );

    statesList = [
      ...statesList,
      { country_id: countryDetails.id, name: 'Punjab', is_active: 1 },
      { country_id: countryDetails.id, name: 'Chandigarh', is_active: 1 },
      { country_id: countryDetails.id, name: 'Haryana', is_active: 1 },
    ];

    await queryInterface.bulkInsert('states', statesList);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('states', null, {});
  },
};
