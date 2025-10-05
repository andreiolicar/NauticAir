// backend/src/database/migrations/20251004230000-add-emission-level-to-alerts.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('alerts', 'emission_level', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Nível de emissão de CO em porcentagem (0-100%)'
    });

    await queryInterface.addConstraint('alerts', {
      fields: ['emission_level'],
      type: 'check',
      where: {
        emission_level: {
          [Sequelize.Op.gte]: 0,
          [Sequelize.Op.lte]: 100
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('alerts', 'emission_level');
  },
};