'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'product_description',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },

        benefits: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          allowNull: true,
        },

        ingredients: {
          type: Sequelize.TEXT,
          allowNull: true,
        },

        featuresList: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          allowNull: true,
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        // Timestamps
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },

        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: function (category, options, fn) {
            category.created_at = new Date();
            category.updated_at = new Date();
            fn(null, user);
          },
          beforeUpdate: function (category, options, fn) {
            category.updated_at = new Date();
            fn(null, category);
          },
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_description');
  },
};
