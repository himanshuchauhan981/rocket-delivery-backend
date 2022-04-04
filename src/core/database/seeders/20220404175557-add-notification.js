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

    await queryInterface.bulkDelete('notification', null, { restartIdentity: true, truncate: true, cascade: true });
    await queryInterface.bulkDelete('notification_user', null, { restartIdentity: true, truncate: true, cascade: true });

    const orderDetails = await queryInterface.rawSelect(
      'orders',
      { where: {}, plain: false },
      ['id', 'created_at', 'user_id', 'order_number'],
    );

    for(const item of orderDetails) {
      const [userDetails] = await queryInterface.rawSelect('users', { where: { id: item.user_id }, plain: false }, ['id', 'first_name', 'last_name']);
      const [adminDetails] = await queryInterface.rawSelect('admin', { where: { super_admin: 1 }, plain: false }, []);

      let notificationBody, createdBy, userType, receiverId, receiverType;

      if(item.status == 'REQUESTED') {
        notificationBody = `${userDetails.name} had placed an order with order number ${item.order_number}`;
        createdBy = item.user_id;
        userType = 'user';
        receiverId = adminDetails.id;
        receiverType = 'admin';
      }
      else if(item.status == 'CONFIRMED') {
        notificationBody = `Admin had confirmed your order with order number ${item.order_number}`;
        createdBy = adminDetails.id;
        userType = 'admin';
        receiverId = item.user_id;
        receiverType = 'user';
      }
      else if(item.status === 'CANCELLED') {
        notificationBody = `${userDetails.name} had cancelled order with order number ${item.order_number}`;
        createdBy = item.user_id;
        userType = 'user';
        receiverId = adminDetails.id;
        receiverType = 'admin';
      }

      if(notificationBody) {
        const notificationArgs = {
          user_id: createdBy,
          body: notificationBody,
          user_type: userType,
          is_deleted: 0,
          metadata: JSON.stringify({
            order_id: item.id,
          }),
          created_at: item.created_at,
        };

        const [newNotification] = await queryInterface.bulkInsert('notification', [notificationArgs], { returning: true });

        const notificationUserArgs = {
          notification_id: newNotification.id,
          user_id: receiverId,
          user_type: receiverType,
          is_read: 0,
          is_sent: 1,
          created_at: newNotification.created_at,
        };

        await queryInterface.bulkInsert('notification_user',[notificationUserArgs])
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
