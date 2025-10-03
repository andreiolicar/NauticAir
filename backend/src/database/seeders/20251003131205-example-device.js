'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assumindo existe usuário admin para user_id (pegue via subquery ou substitua pelo ID real)
    return queryInterface.bulkInsert('devices', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      user_id: Sequelize.literal(`(SELECT id FROM users WHERE email = 'admin@nauticair.com' LIMIT 1)`),
      name: 'Dispositivo de Exemplo',
      status: 'connected',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('devices', { name: 'Dispositivo de Exemplo' });
  }
};