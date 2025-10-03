'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RoutesHistory extends Model {
    static associate(models) {
      RoutesHistory.belongsTo(models.User, { foreignKey: 'user_id' });
      RoutesHistory.belongsTo(models.Device, { foreignKey: 'device_id' });
    }
  }
  RoutesHistory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.UUID, allowNull: false },
    route: { type: DataTypes.STRING(50), allowNull: false },
    duration_h: { type: DataTypes.FLOAT, allowNull: false },
    responsible: { type: DataTypes.STRING(100), allowNull: false },
    device_id: { type: DataTypes.UUID, allowNull: false },
    co2_credits: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('positivo', 'confirmado', 'alerta', 'crítico'), allowNull: false },
  }, {
    sequelize,
    modelName: 'RoutesHistory',
    tableName: 'routes_history',
    timestamps: true,
    underscored: true,
  });
  return RoutesHistory;
};
