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
    await queryInterface.bulkDelete(
      'file',
      {},
      { restartIdentity: true, truncate: true },
    );

    await queryInterface.bulkDelete(
      'categories',
      {},
      { restartIdentity: true, truncate: true, cascade: true },
    );

    const category_list = [
      {
        is_active: 1,
        name: 'Fruits & Vegetables',
        is_sub_category: 1,
        image:
          'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables.jpg',
      },
      {
        is_active: 1,
        name: 'Non Veg',
        is_sub_category: 0,
        image:
          'https://indialovesbest.in/wp-content/uploads/2021/03/How-to-Store-Raw-Chicken-in-Fridge-scaled.jpg',
      },
      {
        is_active: 1,
        name: 'Milk & Dairy',
        is_sub_category: 1,
        image:
          'https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg',
      },
      {
        is_active: 1,
        name: 'Spices',
        is_sub_category: 0,
        image:
          'https://www.homestratosphere.com/wp-content/uploads/2019/04/Different-types-of-spices-of-the-table-apr18.jpg',
      },
      {
        is_active: 1,
        name: 'Beverages',
        is_sub_category: 0,
        image:
          'https://c.ndtvimg.com/2021-02/e2uarbeo_juice-_625x300_25_February_21.jpg',
      },
      {
        is_active: 1,
        name: 'House hold',
        is_sub_category: 1,
        image:
          'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/988EAC9D-00F5-EEE9-6A89B0F36DBAF81C.jpg',
      },
      {
        is_active: 0,
        name: 'Instant food',
        is_sub_category: 0,
        image:
          'https://www.babycenter.com/ims/2019/05/iStock-643845180_wide.jpg',
      },
    ];

    for (const item of category_list) {
      const new_image = await queryInterface.bulkInsert(
        'file',
        [
          {
            name: item.name,
            slug: 'category',
            type: 'image',
            url: item.image,
            extension: 'png',
          },
        ],
        { returning: true },
      );

      await queryInterface.bulkInsert('categories', [
        {
          name: item.name,
          image_id: new_image[0].id,
          is_sub_category: item.is_sub_category,
          is_active: item.is_active,
        },
      ]);
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
      'file',
      {},
      { restartIdentity: true, truncate: true },
    );

    await queryInterface.bulkDelete(
      'categories',
      {},
      { restartIdentity: true, truncate: true, cascade: true },
    );
  },
};
