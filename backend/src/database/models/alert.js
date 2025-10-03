'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alert extends Model {
    static associate(models) {
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
    user_id: { type: DataTypes.UUID, allowNull: false },
    type: { type: DataTypes.ENUM('positivo', 'alerta', 'crítico'), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  }, {
    sequelize,
    modelName: 'Alert',
    tableName: 'alerts',
    timestamps: true,
    underscored: true,
  });
  return Alert;
};
