'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('routes_history', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('routes_history', 'updated_at');
  },
};
