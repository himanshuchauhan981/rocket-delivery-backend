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

    await queryInterface.bulkDelete('users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Patty Manuelli',
          email: 'pmanuelli0@yolasite.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '4446343937',
          type: 'USER',
        },
        {
          name: 'Elton Marflitt',
          email: 'emarflitt1@icio.us',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '9764941693',
          type: 'USER',
        },
        {
          name: 'Alexandr Child',
          email: 'achild2@about.me',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '3078356016',
          type: 'USER',
        },
        {
          name: 'Towny Scandrite',
          email: 'tscandrite3@github.io',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '1368842882',
          type: 'USER',
        },
        {
          name: 'Trixie Exrol',
          email: 'texrol4@engadget.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '6208678760',
          type: 'USER',
        },
        {
          name: 'Florette Crawshaw',
          email: 'fcrawshaw5@bigcartel.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '8598736446',
          type: 'USER',
        },
        {
          name: 'Livy Carwardine',
          email: 'lcarwardine6@taobao.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '2537172191',
          type: 'USER',
        },
        {
          name: 'Annette Falconer-Taylor',
          email: 'afalconertaylor7@nsw.gov.au',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '2184258245',
          type: 'USER',
        },
        {
          name: 'Barny Splaven',
          email: 'bsplaven8@arizona.edu',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '2335115497',
          type: 'USER',
        },
        {
          name: 'Miguela Dawidman',
          email: 'mdawidman9@soup.io',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '3951653444',
          type: 'USER',
        },
        {
          name: 'Katusha Rumens',
          email: 'krumensa@aol.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '1804393865',
          type: 'USER',
        },
        {
          name: 'Felicity Sevitt',
          email: 'fsevittc@is.gd',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '6831348052',
          type: 'USER',
        },
        {
          name: 'Garth Balham',
          email: 'gbalhamd@tripod.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '2853638379',
          type: 'USER',
        },
        {
          name: 'Jerome Audry',
          email: 'jaudrye@chicagotribune.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '5192003242',
          type: 'USER',
        },
        {
          name: 'Petronille Ingreda',
          email: 'pingredaf@disqus.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '6326586656',
          type: 'USER',
        },
        {
          name: 'Judon De Morena',
          email: 'jdeg@ning.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '4108697404',
          type: 'USER',
        },
        {
          name: 'Michelina Helm',
          email: 'mhelmh@census.gov',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '1337951799',
          type: 'USER',
        },
        {
          name: 'Dorette Gent',
          email: 'dgenti@hibu.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '4233879118',
          type: 'USER',
        },
        {
          name: 'Patti Fairpool',
          email: 'pfairpoolj@symantec.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '5063545549',
          type: 'USER',
        },
        {
          name: 'Yehudit Renehan',
          email: 'yrenehank@boston.com',
          password:
            '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
          country_code: '+91',
          mobile_number: '4229399337',
          type: 'USER',
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

    await queryInterface.bulkDelete('users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
