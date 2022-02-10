'use strict';

module.exports = {
  randomWords(limit) {
    let possibleWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let text = '';
    for (var i = 0; i < limit; i++) {
      text += possibleWords.charAt(Math.floor(Math.random() * possibleWords.length));
    }
    return text;
  },

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
  },
  
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

     const orderDetails = await queryInterface.rawSelect('orders', { where: {}, plain: false }, ['id']);

     for(const item of orderDetails) {
      const orderProductDetails = await queryInterface.rawSelect('order_products',{ where: { order_id: item.id }, plain: false}, ['id']);

      for(const orderProductItem of orderProductDetails) {
        const productReviewDetails = await queryInterface.bulkInsert('product_review',[{
          headline: this.randomWords(this.randomNumber(5,40)),
          opinion: this.randomWords(this.randomNumber(5,40)),
          user_id: orderDetails[0].user_id,
          product_id: orderProductItem.product_id,
          ratings: this.randomNumber(0, 5),
          order_id: orderProductItem.order_id
        }], {returning: true});

        const totalProductReviewImages = this.randomNumber(0,3);

        for(let i=0; i<totalProductReviewImages; i++) {
          await queryInterface.bulkInsert('product_review_file',[{
            url:'https://firebasestorage.googleapis.com/v0/b/rocket-delivery-f95dc.appspot.com/o/rn_image_picker_lib_temp_59ea0069-0917-4e10-a6a1-526dc7887a40.jpg?alt=media&token=fd557248-ea11-4b03-8867-d8de6f1a0192',
            review_id: productReviewDetails[0].id,
            type: 'image/jpeg'
          }]);
        }
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
