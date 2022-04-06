// 'use strict';
// import faker from 'faker';
const faker = require('@faker-js/faker').default;

module.exports = {
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
    await queryInterface.bulkDelete(
      'product_review_file',
      {},
      { restartIdentity: true, truncate: true },
    );

    await queryInterface.bulkDelete(
      'product_review',
      {},
      { restartIdentity: true, truncate: true },
    );

    const orderDetails = await queryInterface.rawSelect(
      'orders',
      { where: {}, plain: false },
      ['id'],
    );

    for (const item of orderDetails) {
      const orderProductDetails = await queryInterface.rawSelect(
        'order_products',
        { where: { order_id: item.id }, plain: false },
        ['id'],
      );

      for (const orderProductItem of orderProductDetails) {
        const productReviewDetails = await queryInterface.bulkInsert(
          'product_review',
          [
            {
              headline: faker.random.words(this.randomNumber(3, 8)),
              opinion: faker.random.words(this.randomNumber(5, 50)),
              user_id: item.user_id,
              product_id: orderProductItem.product_id,
              ratings: this.randomNumber(0, 5),
              order_id: orderProductItem.order_id,
            },
          ],
          { returning: true },
        );

        const totalProductReviewImages = this.randomNumber(1, 5);

        for (let i = 0; i < totalProductReviewImages; i++) {
          await queryInterface.bulkInsert('product_review_file', [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/rocket-delivery-f95dc.appspot.com/o/rn_image_picker_lib_temp_59ea0069-0917-4e10-a6a1-526dc7887a40.jpg?alt=media&token=fd557248-ea11-4b03-8867-d8de6f1a0192',
              review_id: productReviewDetails[0].id,
              type: 'image/jpeg',
            },
          ]);
        }
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

    await queryInterface.bulkDelete(
      'product_review_file',
      {},
      { restartIdentity: true, truncate: true },
    );
  },
};
