'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Measurement extends Model {
    static associate(models) {
      Measurement.belongsTo(models.Device, { foreignKey: 'device_id' });
    }
  }
  Measurement.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    device_id: { type: DataTypes.UUID, allowNull: false },
    co_ppm: { type: DataTypes.FLOAT, allowNull: false },
    co2_gph: { type: DataTypes.FLOAT, allowNull: false },
    duration_h: { type: DataTypes.FLOAT, allowNull: true }
  }, {
    sequelize,
    modelName: 'Measurement',
    tableName: 'measurements',
    timestamps: true,
    underscored: true,
  });
  return Measurement;
};
