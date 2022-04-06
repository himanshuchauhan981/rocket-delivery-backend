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
    await queryInterface.bulkDelete('admin', null, {});

    await queryInterface.bulkInsert(
      'admin',
      [
        {
          email: 'rocketAdmin@yopmail.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
        },
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

    await queryInterface.bulkDelete('admin', null, {});
  },
};
