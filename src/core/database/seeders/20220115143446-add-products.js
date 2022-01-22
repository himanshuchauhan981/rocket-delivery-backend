'use strict';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('products', null ,{});

    const product_data = [
      {
        name: 'Raisins',
        image:
          'https://c.ndtvimg.com/2019-06/r8hbd0so_raisin_625x300_26_June_19.jpg',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul Cheese',
        image:
          'https://www.jiomart.com/images/product/420x420/490001401/amul-cheese-block-200-g-carton-0-20201111.jpg',
        category_id: 3,
        sub_category_id: 4,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Britannia Pizza Cheese',
        image:
          'https://www.vrindasupermart.in/wp-content/uploads/2020/05/91A1OEtI-L._SL1500_.jpg',
        category_id: 3,
        sub_category_id: 4,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Dutch Gouda Cheese',
        image:
          'https://cdn.urbanpiper.com/media/bizmedia/2020/09/26/23_COMPRESSED.png',
        category_id: 3,
        sub_category_id: 4,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul Taaza Toned Milk',
        image:
          'https://5.imimg.com/data5/NC/FO/MY-31836378/148715_2-amul-taaza-toned-milk-500x500.jpg',
        category_id: 3,
        sub_category_id: 5,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Nestle a+ Slim Skimmed Milk (Tetra Pack) - Pack of 5',
        image: 'https://m.media-amazon.com/images/I/717U2Jbqb+L._SX425_.jpg',
        category_id: 3,
        sub_category_id: 5,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Hershey Strawberry Milk Shake',
        image: 'https://m.media-amazon.com/images/I/51VdOcxBGzL._SL1000_.jpg',
        category_id: 3,
        sub_category_id: 5,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul (100g) Butter',
        image:
          'https://m.media-amazon.com/images/S/aplus-media/sota/95d868ed-6acd-4efc-990f-ee892ff3118d.__CR0,0,970,600_PT0_SX970_V1___.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mother Dairy (500g) Butter',
        image:
          'https://www.bigbasket.com/media/uploads/p/xxl/30007664_6-mother-dairy-butter.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul Garlic & Herbs Butter',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/40018687_2-amul-buttery-spread-garlic-herbs.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul lite milk fat butter',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/255187_4-amul-lite-milk-fat-spread.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Amul Buttery Chocolate Butter',
        image:
          'https://www.bigbasket.com/media/uploads/p/xxl/229134_3-amul-lite-milk-fat-spread.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Ghadi Machine Wash Detergent Powder',
        image: 'https://m.media-amazon.com/images/I/71G9EXWwaSL._SL1500_.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Dates',
        image:
          'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/medjool-dates-1296x728-header-1296x728.jpg?w=1155&h=1528',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Surf Excel Matic Top Load Detergent Powder',
        image: 'https://m.media-amazon.com/images/I/61OZNxFaxFL._SX425_.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Surf Excel Quick Wash Detergent Powder',
        image:
          'https://www.bigbasket.com/media/uploads/p/xxl/40192803_1-surf-excel-quick-wash-detergent-powder.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Ariel Matic Top Load Detergent Powder',
        image:
          'https://www.zelorra.com/grocery/wp-content/uploads/2020/09/Ariel-Matic-Top-Load-Detergent-Washing-Powder-1-kg-Front.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mr. White Ultimate whiteness Detergent Powder',
        image: 'https://m.media-amazon.com/images/I/715iEu9nisL._SL1500_.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'SaveMore Citrus Floor Cleaner',
        image:
          'https://cdn.grofers.com/app/images/products/full_screen/pro_380022.jpg?ts=1560146866',
        category_id: 6,
        sub_category_id: 8,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Godrej Pro Clean Disinfectant Toilet Cleaner',
        image:
          'https://res.sastasundar.com/incom/images/product/Godrej-Proclean-Disinfectant-Toilet-Cleaner-Free-Proclean-Toilet-Cleaner-500-ml-1602648981-10077148-1.jpg',
        category_id: 6,
        sub_category_id: 8,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Baygon Cockroach Killer',
        image: 'https://m.media-amazon.com/images/I/51gg9OTuJPL._SL1000_.jpg',
        category_id: 6,
        sub_category_id: 9,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mortein Insta Vaporiser Mosquito Repellent (Refill) - Pack of 3',
        image:
          'Mortein Insta Vaporiser Mosquito Repellent (Refill) - Pack of 3',
        category_id: 6,
        sub_category_id: 9,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Dettol Liquid Lime Fresh Disinfectant',
        image: 'https://m.media-amazon.com/images/I/517WpNzGv5S._SL1000_.jpg',
        category_id: 6,
        sub_category_id: 10,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Savlon Multipurpose Liquid Cleaner Disinfectant',
        image: 'https://m.media-amazon.com/images/I/61RjjExKC9L._SL1200_.jpg',
        category_id: 6,
        sub_category_id: 10,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Nature Protect Multipurpose Disinfectant Spray',
        image:
          'https://www.bigbasket.com/media/uploads/p/xxl/40203402_1-nature-protect-germ-kill-spray.jpg',
        category_id: 6,
        sub_category_id: 10,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Savlon Surface Disinfectant Spray',
        image: 'https://m.media-amazon.com/images/I/514hU8nuPiS._SL1500_.jpg',
        category_id: 6,
        sub_category_id: 10,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Gowardhan (500g) Butter',
        image:
          'https://d37ky63zmmmzfj.cloudfront.net/production/itemimages/grocery/bread_dairy_products/butter_cream/gowardhan_gowardan_butter_500g.jpg',
        category_id: 3,
        sub_category_id: 6,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Delichic Full - Chicken Leg',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/800363858_1-deli-chic-chicken-drumsticks-tangri-legs-halal-cut.jpg',
        category_id: 2,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Everest Amchur Powder',
        image: 'https://m.media-amazon.com/images/I/91AGWtx3qdL._SY550_.jpg',
        category_id: 4,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Bisleri Soda (Bottle) - Pack of 2',
        image:
          'https://cdn.grofers.com/app/images/products/full_screen/pro_366704.jpg',
        category_id: 5,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Harpic Power Plus Orignal Toilet Cleaner',
        image: 'https://m.media-amazon.com/images/I/41NIMV5zbfL.jpg',
        category_id: 6,
        sub_category_id: 8,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Cashews',
        image:
          'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/269468_2200-732x549.jpg',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Delichic Curry Cut Whole - Chicken',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/800363848_1-deli-chic-chicken-whole-curry-cut-halal-cut.jpg',
        category_id: 2,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Grapes',
        image:
          'https://www.aicr.org/wp-content/uploads/2020/01/shutterstock_533487490-640x462.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Bitter gourd',
        image:
          'https://www.organicauthority.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU5MzI5NjY5NzYwMTY1MDc4/small-bitter-melons-on-vintage-wooden-background.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Kiwi',
        image:
          'https://api.time.com/wp-content/uploads/2017/02/gettyimages-135589400.jpg?w=824&quality=70',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Guava',
        image:
          'https://post.healthline.com/wp-content/uploads/2020/09/benefits-of-guavas-732x549-thumbnail-732x549.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mosambi',
        image:
          'https://publiccanteen.com/wp-content/uploads/2020/05/sweet_lime_online_delhi.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Coconut',
        image:
          'https://images.everydayhealth.com/images/diet-nutrition/all-about-coconut-722x406.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'All Out Ultra - Mosquito Repellent (Refill) - 6 units',
        image: 'https://m.media-amazon.com/images/I/61Vj9w5RNoL._SL1000_.jpg',
        category_id: 6,
        sub_category_id: 9,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'DND Mosquito Repellent - Refill',
        image: 'https://m.media-amazon.com/images/I/51FAI3FuM0L._SY741_.jpg',
        category_id: 6,
        sub_category_id: 9,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Orange',
        image:
          'https://static.independent.co.uk/2021/01/30/12/iStock-1131608539or.jpg?width=1200&auto=webp&quality=75',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Capsicum',
        image:
          'https://img1.exportersindia.com/product_images/bc-full/2020/4/4124791/fresh-green-capsicum-1586429836-5364952.jpeg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Cucumber',
        image:
          'https://gardenerspath.com/wp-content/uploads/2021/05/Types-of-Cucumbers-FB.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mushrooms',
        image:
          'https://cdn-prod.medicalnewstoday.com/content/images/articles/278/278858/mushrooms-in-a-bowel-on-a-dark-table.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Beetroots',
        image:
          'https://c.ndtvimg.com/2020-11/e9tbf7ao_beetroot_625x300_25_November_20.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Cabbage',
        image:
          'https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/articleimages/2021/05/30/istock-11302298531-991753-1622371471.jpg?itok=n3No5uTV',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Brinjal',
        image:
          'https://tastedrecipes.com/wp-content/uploads/2020/04/brinjal.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Ladies Finger',
        image:
          'https://5.imimg.com/data5/DJ/JU/MY-52183777/fresh-lady-finger-500x500.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Walnuts',
        image:
          'https://static.toiimg.com/photo/msid-81211850/81211850.jpg?1153434',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Delichic Breast - Chicken Keema',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/800461758_1-deli-chic-chicken-breast.jpg',
        category_id: 2,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Everest Coriander Powder/Dhania',
        image:
          'https://www.bigbasket.com/media/uploads/p/xxl/100004178-2_2-everest-powder-green-coriander.jpg',
        category_id: 4,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Watermelon',
        image:
          'https://all-americaselections.org/wp-content/uploads/2019/06/Watermelon-Mambo.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Mango',
        image:
          'https://images.news18.com/ibnlive/uploads/2021/08/1628223597_mangoes-1200x800.png',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Real Fruit Power Mixed Fruit Juice - Pack of 2',
        image: 'https://m.media-amazon.com/images/I/81Fnmd+yNqL._SL1500_.jpg',
        category_id: 5,
        sub_category_id: null,
        measuring_unit_id: 4,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Apple',
        image:
          'https://images.everydayhealth.com/images/apples-101-about-1440x810.jpg?sfvrsn=f86f2644_1',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Strawberry',
        image:
          'https://cdn.britannica.com/22/75922-050-D3982BD0/flowers-fruits-garden-strawberry-plant-species.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Emmenthal Cheese',
        image:
          'https://media.istockphoto.com/photos/cheese-picture-id514981644?k=6&m=514981644&s=612x612&w=0&h=_kBlOXRxHsgys129W7mpW_8wSbUg3pxo4BUy88sYwuE=',
        category_id: 3,
        sub_category_id: 4,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Tide Plus Double Power Lemon & Mint Detergent Powder',
        image:
          'https://images-static.nykaa.com/media/catalog/product/5/6/56374c14902430875011.png',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Wheel Blue 2 In 1 Detergent Powder (Packet)',
        image: 'https://m.media-amazon.com/images/I/81wH8Zun7PS._AC_SS450_.jpg',
        category_id: 6,
        sub_category_id: 7,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Delichic Smoked Salami Turkey',
        image:
          'https://www.bigbasket.com/media/uploads/p/l/800363932_1-deli-chic-turkey-smoked-salami.jpg',
        category_id: 2,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Satyam Bay Leaf/Tej Patta',
        image:
          'https://5.imimg.com/data5/TP/BR/MY-2994153/dry-tej-patta-bay-leaf-500x500.jpg',
        category_id: 4,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Limca Lime Lemon 750 ml Soft Drink (Bottle)',
        image:
          'https://cdn.grofers.com/app/images/products/full_screen/pro_9483.jpg?ts=1593775387',
        category_id: 5,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Real Masala Guava Juice - Buy 1 Get 1 Free',
        image: 'https://m.media-amazon.com/images/I/51VwzmYEdRL.jpg',
        category_id: 5,
        sub_category_id: null,
        measuring_unit_id: 3,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Tomato',
        image:
          'https://gardeningknowhow.com/wp-content/uploads/2021/05/tomatoes.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Potatoes',
        image: 'https://cdn.britannica.com/89/170689-131-D20F8F0A/Potatoes.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Peas',
        image:
          'https://www.thestatesman.com/wp-content/uploads/2019/03/Peas.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Blueberry',
        image:
          'https://www.thespruceeats.com/thmb/lDfuW2D9PaU549NWEBrdixXbp9I=/1887x1415/smart/filters:no_upscale()/blueberriesx-56a495273df78cf772831b99.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Papaya',
        image:
          'https://post.healthline.com/wp-content/uploads/2020/09/papaya-benefits-732x549-thumbnail-732x549.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'test',
        image:
          'https://firebasestorage.googleapis.com/v0/b/rocket-delivery-f95dc.appspot.com/o/pictures?alt=media&token=33c5abb9-2aa9-492e-9695-edce898ca7ad',
        category_id: 5,
        sub_category_id: null,
        measuring_unit_id: 3,
        description: 'test',
      },
      {
        name: 'Onion',
        image: 'https://m.media-amazon.com/images/I/71G2ZJO50+L._SL1500_.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Pumpkin',
        image: 'https://static.toiimg.com/photo/72279200.cms',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Raddish',
        image:
          'https://5.imimg.com/data5/SELLER/Default/2020/12/OP/ZQ/IO/75324731/34-500x500.jpg',
        category_id: 1,
        sub_category_id: 2,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Almonds',
        image:
          'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/269468_2200-732x549.jpg',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Pistachio',
        image:
          'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322899_2200-732x549.jpg',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Peanuts',
        image:
          'https://images.everydayhealth.com/images/heart-health/high-cholesterol/eating-nuts-adds-up-to-longer-life-722x406.jpg',
        category_id: 1,
        sub_category_id: 3,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Banana',
        image:
          'https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg?quality=90&resize=960%2C872',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 2,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
      {
        name: 'Pineapple',
        image:
          'https://mindbodygreen-res.cloudinary.com/image/upload/c_crop,x_0,y_353,w_1200,h_674/c_fill,w_700,h_400,g_auto,q_90,fl_lossy,f_jpg/org/5nlo30e2lkjoqfney.jpg',
        category_id: 1,
        sub_category_id: 1,
        measuring_unit_id: 1,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
      },
    ];

    for (const [index, item] of product_data.entries()) {
      const new_image = await queryInterface.bulkInsert(
        'file',
        [{ name: item.name, slug: 'product', type: 'image', url: item.image }],
        { returning: true },
      );

      const newProduct = await queryInterface.bulkInsert('products', [
        {
          name: item.name,
          category_id: item.category_id,
          sub_category_id: item.sub_category_id,
          image_id: new_image[0].id,
          is_active: item.is_active,
          max_quantity: randomNumber(1, 20),
          purchase_limit: randomNumber(1, 5),
          measuring_unit_id: item.measuring_unit_id,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
          is_active: 1,
          is_deleted: 0,
        },
      ],{ returning: true });

      await queryInterface.bulkInsert('product_price',
        [{
          product_id: newProduct[0].id,
          actual_price: randomNumber(100,300),
          discount: null,
          discount_start_date: null,
          discount_end_date: null,
          discount_type: null,
          refundable: true,
        }],
			);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('products', null, {});
     */

    await queryInterface.bulkDelete('products', null, { resetIdSequence: true });

    await queryInterface.bulkDelete('product_price', null, { resetIdSequence: true });
  },
};
