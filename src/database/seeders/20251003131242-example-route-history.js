'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('routes_history', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      user_id: Sequelize.literal(`(SELECT id FROM users WHERE email = 'admin@nauticair.com' LIMIT 1)`),
      route: 'Exemplo de Rota',
      duration_h: 1.5,
      responsible: 'Admin',
      device_id: Sequelize.literal(`(SELECT id FROM devices WHERE name = 'Dispositivo de Exemplo' LIMIT 1)`),
      co2_credits: 2.5,
      status: 'positivo',
      created_at: new Date(),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('routes_history', { route: 'Exemplo de Rota' });
  }
};