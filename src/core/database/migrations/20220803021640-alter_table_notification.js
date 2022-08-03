'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('notification', 'notification_template_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('notification', {
      type: 'FOREIGN KEY',
      fields: ['notification_template_id'],
      name: 'fk_notification_template_notification',
      references: {
        table: 'notification_template',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(
      'notification',
      'notification_template_id',
    );

    await queryInterface.removeConstraint(
      'notification',
      'fk_notification_template_notification',
      {},
    );
  },
};
