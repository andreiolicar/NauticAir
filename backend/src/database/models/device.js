'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Device extends Model {
    static associate(models) {
      Device.belongsTo(models.User, { foreignKey: 'user_id' });
      Device.hasMany(models.Measurement, { foreignKey: 'device_id' });
      Device.hasMany(models.RoutesHistory, { foreignKey: 'device_id' });
    }
  }
  Device.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.ENUM('connected', 'disconnected'), allowNull: false },
  }, {
    sequelize,
    modelName: 'Device',
    tableName: 'devices',
    timestamps: true,
    underscored: true,
  });
  return Device;
};
