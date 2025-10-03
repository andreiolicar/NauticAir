'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    return queryInterface.bulkInsert('users', [{
      id: Sequelize.literal('uuid_generate_v4()'),
      name: 'Admin',
      email: 'admin@nauticair.com',
      password_hash: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', { email: 'admin@nauticair.com' });
  }
};