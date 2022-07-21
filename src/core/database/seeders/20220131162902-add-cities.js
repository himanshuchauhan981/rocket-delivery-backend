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

    await queryInterface.bulkDelete('cities', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });

    let citiesList = [
      { name: 'Bhatinda', is_active: 1, state: 'Punjab' },
      { name: 'Ludhiana', is_active: 1, state: 'Punjab' },
      { name: 'Khanna', is_active: 1, state: 'Punjab' },

      { name: 'Chandigarh', is_active: 1, state: 'Chandigarh' },

      { name: 'Ambāla', is_active: 1, state: 'Haryana' },
      { name: 'Gurgaon', is_active: 1, state: 'Haryana' },
      { name: 'Kurukshetra', is_active: 1, state: 'Haryana' },

      { name: 'Amherstburg', is_active: 1, state: 'Ontario' },
      { name: 'Belleville', is_active: 1, state: 'Ontario' },
      { name: 'Bancroft', is_active: 1, state: 'Ontario' },

      { name: 'Altona', is_active: 1, state: 'Manitoba' },
      { name: 'Beausejour', is_active: 1, state: 'Manitoba' },

      { name: 'Cottonwood', is_active: 1, state: 'Alabama' },
      { name: 'Daleville', is_active: 1, state: 'Alabama' },
      { name: 'Greensboro', is_active: 1, state: 'Alabama' },

      { name: 'Buchanan', is_active: 1, state: 'Georgia' },
      { name: 'Chickamauga', is_active: 1, state: 'Georgia' },
      { name: 'Cusseta', is_active: 1, state: 'Georgia' },

      { name: 'Shelley', is_active: 1, state: 'Idaho' },
      { name: 'Saint Maries', is_active: 1, state: 'Idaho' },

      { name: 'Bartow', is_active: 1, state: 'Florida' },
      { name: 'Bee Ridge', is_active: 1, state: 'Florida' },
      { name: 'Callahan', is_active: 1, state: 'Florida' },
    ];

    let stateDetails = await queryInterface.rawSelect(
      'states',
      { where: { is_active: 1 }, plain: false },
      ['name', 'id'],
    );

    for (const item of stateDetails) {
      const cities = citiesList.filter((item) => item.state === item.name);

      const newCities = cities.map((v) => ({
        name: v.name,
        is_active: 1,
        state_id: item.id,
      }));

      await queryInterface.bulkInsert('cities', newCities);
    }
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cities', null, {});
  },
};
