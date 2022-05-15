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

    await queryInterface.bulkDelete('notification_template', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });

    const notificationTemplateList = [
      {
        slug: 'ORDER_REQUESTED',
        title: 'Order Placed',
        body: 'We have recieved your order and your order is now proccessing.',
      },
      {
        slug: 'ORDER_CONFIRMED',
        title: 'Order Confirmed',
        body: 'Your order has been confirmed successfully. You can view your order in order section.',
      },
      {
        slug: 'ORDER_DELIVERED',
        title: 'Order Delivered',
        body: 'Hey, great news!  Your order has been delivered. Let us know if you like your order.',
      },
      {
        slug: 'ORDER_CANCELLED',
        title: 'Order Cancelled',
        body: 'Your order has been cancelled. Let us know where we went wrong.',
      },
      {
        slug: 'DELIVERY_CONFIRMED',
        title: 'Delivery Confirmed',
        body: 'Your order has been assigned to delivery agent.',
      },
      {
        slug: 'DELIVERY_PICKED',
        title: 'Delivery Picked',
        body: 'Your order has been picked up by the delivery Agent. It would be delivered soon.',
      },
      {
        slug: 'DELIVERY_ON_THE_WAY',
        title: 'Order on the way',
        body: 'Your order is on the way. The delivery agent will deliver it soon.',
      },
      {
        slug: 'DELIVERY_COMPLETED',
        title: 'Order Delivered',
        body: 'Hey, great news!  Your order has been delivered. Let us know if you like your order.',
      },
    ];

    await queryInterface.bulkInsert(
      'notification_template',
      notificationTemplateList,
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('notification_template', null, {});
  },
};
