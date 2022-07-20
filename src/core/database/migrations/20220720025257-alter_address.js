'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('address', 'state');

    await queryInterface.removeColumn('address', 'city');

    await queryInterface.removeColumn('address', 'country_code');

    await queryInterface.addColumn('address', 'country_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('address', 'state_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('address', 'city_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('address', {
      type: 'FOREIGN KEY',
      fields: ['country_id'],
      name: 'fk_address_countries',
      references: {
        table: 'countries',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('address', {
      type: 'FOREIGN KEY',
      fields: ['state_id'],
      name: 'fk_address_states',
      references: {
        table: 'states',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('address', {
      type: 'FOREIGN KEY',
      fields: ['city_id'],
      name: 'fk_address_cities',
      references: {
        table: 'cities',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('address', 'country_id');

    await queryInterface.removeColumn('address', 'state_id');

    await queryInterface.removeColumn('address', 'city_id');

    await queryInterface.addColumn('address', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('address', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('address', 'country_code', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeConstraint(
      'address',
      'fk_address_countries',
      {},
    );

    await queryInterface.removeConstraint('address', 'fk_address_states', {});

    await queryInterface.removeConstraint('address', 'fk_address_cities', {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
