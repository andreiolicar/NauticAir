'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('routes_history', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      route: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      duration_h: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      responsible: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      device_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'devices', key: 'id' },
        onDelete: 'CASCADE',
      },
      co2_credits: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('positivo', 'confirmado', 'alerta', 'crítico'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
    await queryInterface.addIndex('routes_history', ['user_id', 'created_at']);
    await queryInterface.addIndex('routes_history', ['device_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('routes_history');
  },
};