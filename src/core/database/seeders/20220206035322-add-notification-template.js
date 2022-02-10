'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkDelete('notification_template', null, { restartIdentity: true, truncate: true });

    await queryInterface.bulkInsert(
      'notification_template',
      [
        {
          slug: 'order-request',
          title: 'Order request',
          description: 'Your order is placed successfully and is waiting approval from the seller.',
          created_by: 'ADMIN'
        },
        {
          slug: 'order-confirmed',
          title: 'Order confirmation',
          description: 'Your order is successfully confirmed. You can view you order details here.',
          created_by: 'ADMIN'
        },
        {
          slug: 'order-delivered',
          title: 'Order delivery',
          description: 'Your order has been delivered.',
          created_by: 'ADMIN'
        },
        {
          slug: 'order-cancelled',
          title: 'Order cancelled',
          description: 'Your order is cancelled. Let us know where we went wrong.',
          created_by: 'ADMIN'
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('notification_template', null, {});
  }
};
