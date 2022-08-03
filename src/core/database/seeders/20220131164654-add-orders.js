'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  },

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

    await queryInterface.bulkDelete('order_products', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('orders', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });

    const usersList = await queryInterface.rawSelect(
      'users',
      { where: {}, plain: false },
      ['id'],
    );

    for (const userItem of usersList) {
      const totalOrders = this.randomNumber(1, 20);
      const userAddress = await queryInterface.rawSelect(
        'address',
        { where: { user_id: userItem.id }, plain: false },
        ['id'],
      );

      for (let i = 0; i < totalOrders; i++) {
        const totalProducts = this.randomNumber(1, 5);
        const orderDate = this.randomDate(new Date(2022, 0, 1), new Date());

        const orderDetails = await queryInterface.bulkInsert(
          'orders',
          [
            {
              order_number: uuidv4(),
              user_id: userItem.id,
              status: 'REQUESTED',
              delivery_charges: 10,
              payment_method: 'CASH',
              amount: 0,
              net_amount: 0,
              user_address: userAddress[0].id,
              payment_status: 'UNPAID',
              delivery_status: 'PENDING',
              delivery_date: new Date(),
              created_at: orderDate,
              updated_at: orderDate,
            },
          ],
          { returning: true },
        );

        let orderProducts = [];
        let amount = 0;
        for (let j = 0; j < totalProducts; j++) {
          const productId = this.randomNumber(1, 78);
          const quantity = this.randomNumber(1, 4);

          const productDetails = await queryInterface.rawSelect(
            'products',
            { where: { id: productId }, plain: false },
            ['id'],
          );
          const productPriceDetails = await queryInterface.rawSelect(
            'product_price',
            { where: { id: productDetails[0].id }, plain: false },
            ['id'],
          );
          const imageDetails = await queryInterface.rawSelect(
            'file',
            { where: { id: productDetails[0].image_id }, plain: false },
            ['id'],
          );
          amount = amount + productPriceDetails[0].actual_price * quantity;

          orderProducts.push({
            order_id: orderDetails[0].id,
            product_id: productDetails[0].id,
            product_name: productDetails[0].name,
            product_image: imageDetails[0].url,
            quantity,
            price: productPriceDetails[0].actual_price,
          });
        }
        await queryInterface.bulkInsert('order_products', orderProducts);
        await queryInterface.bulkUpdate(
          'orders',
          { amount: amount, net_amount: amount + 10 },
          { id: orderDetails[0].id },
        );
      }
    }
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('order_products', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('orders', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
