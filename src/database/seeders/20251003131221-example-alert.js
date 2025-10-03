'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('alerts', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      user_id: Sequelize.literal(`(SELECT id FROM users WHERE email = 'admin@nauticair.com' LIMIT 1)`),
      type: 'alerta',
      message: 'Alerta de exemplo',
      created_at: new Date(),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('alerts', { message: 'Alerta de exemplo' });
  }
};