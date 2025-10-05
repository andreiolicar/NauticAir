'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Habilita a extensão uuid-ossp
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  },

  async down(queryInterface, Sequelize) {
    // Remove a extensão (opcional, pode deixar em branco)
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
};