'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alert extends Model {
    static associate(models) {
      // Alerta pertence a um usuário
      Alert.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Alert.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { 
      type: DataTypes.UUID, 
      allowNull: false 
    },
    type: { 
      type: DataTypes.ENUM('positivo', 'alerta', 'crítico'), 
      allowNull: false 
    },
    message: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    emission_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      },
      comment: 'Nível de emissão de CO em porcentagem (0-100%) para a barra de progresso'
    }
  }, {
    sequelize,
    modelName: 'Alert',
    tableName: 'alerts',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return Alert;
};