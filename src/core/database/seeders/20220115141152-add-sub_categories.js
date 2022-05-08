'use strict';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

    await queryInterface.bulkDelete('sub_categories', null, {});

    const sub_category_data = [
      {
        id: 1,
        name: 'Fruits',
        categoryId: 1,
        image:
          'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature_thumb.jpg?sfvrsn=7abe71fe_4',
        is_active: 1,
      },
      {
        id: 2,
        name: 'Vegetables',
        categoryId: 1,
        image:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg?crop=0.669xw:1.00xh;0.300xw,0&resize=640:*',
        is_active: 1,
      },
      {
        id: 3,
        name: 'Dry Fruits',
        categoryId: 1,
        image:
          'https://www.nutfruit.org/images/noticia/1597227233-nuts-and-dried-fruits2.jpeg',
        is_active: 1,
      },
      {
        id: 4,
        name: 'Cheese',
        categoryId: 3,
        image:
          'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg?w=1155&h=1528',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 5,
        name: 'Milk',
        categoryId: 3,
        image: 'https://ychef.files.bbci.co.uk/976x549/p08vpmjp.jpg',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 6,
        name: 'Butter',
        categoryId: 3,
        image:
          'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/butter-curls-1296x728-header.jpg?w=1155&h=1528',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 7,
        name: 'Detergents',
        categoryId: 6,
        image:
          'https://cdn.thewirecutter.com/wp-content/uploads/2020/06/laundrydetergent-lowres-2x1-6429-1024x512.jpg',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 8,
        name: 'Cleaners',
        categoryId: 6,
        image:
          'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/988EAC9D-00F5-EEE9-6A89B0F36DBAF81C.jpg',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 9,
        name: 'Repellents',
        categoryId: 6,
        image:
          'https://cdn.thewirecutter.com/wp-content/uploads/2019/03/bug-repellent-lowres-9669.jpg',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 10,
        name: 'Disinfectants',
        categoryId: 6,
        image:
          'https://static.straitstimes.com.sg/s3fs-public/articles/2020/04/26/dw-us-disinfectant-covid19-200426.jpg',
        is_deleted: 0,
        is_active: 1,
      },
      {
        id: 11,
        name: 'Noodles',
        categoryId: 7,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/1200px-Mama_instant_noodle_block.jpg',
        is_deleted: 0,
        is_active: 0,
      },
      {
        id: 12,
        name: 'Pickles',
        categoryId: 7,
        image:
          'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325124_2200-732x549.jpg',
        is_deleted: 0,
        is_active: 0,
      },
      {
        id: 13,
        name: 'Frozen food',
        categoryId: 7,
        image:
          'https://res.cloudinary.com/purnesh/image/upload/f_auto/v1500453023/modern-bazaar002.jpg',
        is_deleted: 0,
        is_active: 0,
      },
      {
        id: 14,
        name: 'Readymade meals',
        categoryId: 7,
        image:
          'https://www.naturalproductsinsider.com/sites/naturalproductsinsider.com/files/10_16_Personalized%20Ready%20Meals.jpg',
        is_deleted: 0,
        is_active: 1,
      },
    ];

    for (const [index, item] of sub_category_data.entries()) {
      const new_image = await queryInterface.bulkInsert(
        'file',
        [
          {
            name: item.name,
            slug: 'sub-category',
            type: 'image',
            url: item.image,
            extension: 'jpeg',
            size: randomNumber(1, 1000) * 1000,
          },
        ],
        { returning: true },
      );

      await queryInterface.bulkInsert('sub_categories', [
        {
          id: index + 1,
          name: item.name,
          category_id: item.categoryId,
          image_id: new_image[0].id,
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

    await queryInterface.bulkDelete('sub_categories', null, {});
  },
};
