'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar se created_at já existe antes de adicionar
    const table = await queryInterface.describeTable('measurements');
    
    if (!table.created_at) {
      await queryInterface.addColumn('measurements', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    if (!table.updated_at) {
      await queryInterface.addColumn('measurements', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('measurements');
    
    if (table.created_at) {
      await queryInterface.removeColumn('measurements', 'created_at');
    }
    
    if (table.updated_at) {
      await queryInterface.removeColumn('measurements', 'updated_at');
    }
  }
};