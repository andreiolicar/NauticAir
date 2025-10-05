const db = require('../database/models');
const AlertsService = require('./alerts.service');
const { Op } = require('sequelize');

class MeasurementsService {
  // POST /api/measurements - Dispositivo IoT envia medição
  async createMeasurement(measurementData) {
    const { device_id, co_ppm, co2_gph, duration_h } = measurementData;

    const device = await db.Device.findByPk(device_id);
    if (!device) {
      const error = new Error('Dispositivo não encontrado');
      error.statusCode = 404;
      throw error;
    }

    const measurement = await db.Measurement.create({
      device_id,
      co_ppm,
      co2_gph,
      duration_h: duration_h || null
    });

    if (device.status !== 'connected') {
      await device.update({ status: 'connected' });
    }

    // ✅ Verificar mudança de LED e criar alerta
    await AlertsService.checkAndCreateAlert(measurement, device);

    return measurement;
  }

  // GET /api/measurements - Listar medições com filtros
  async getMeasurements(userId, filters = {}) {
    const { device_id, start_date, end_date, limit = 50, offset = 0 } = filters;

    // Buscar dispositivos do usuário
    const userDevices = await db.Device.findAll({
      where: { user_id: userId },
      attributes: ['id']
    });

    const deviceIds = userDevices.map(d => d.id);

    if (deviceIds.length === 0) {
      return { measurements: [], total: 0 };
    }

    // Construir filtros
    const whereClause = {
      device_id: device_id || { [Op.in]: deviceIds }
    };

    if (start_date || end_date) {
      whereClause.createdAt = {};
      if (start_date) whereClause.createdAt[Op.gte] = new Date(start_date);
      if (end_date) whereClause.createdAt[Op.lte] = new Date(end_date);
    }

    // Buscar medições
    const { count, rows } = await db.Measurement.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: db.Device,
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return {
      measurements: rows,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };
  }

  // GET /api/measurements/summary - Dados agregados para dashboard
  async getMeasurementsSummary(userId, filters = {}) {
    const { device_id, start_date, end_date } = filters;

    // Buscar dispositivos do usuário
    const userDevices = await db.Device.findAll({
      where: { user_id: userId },
      attributes: ['id']
    });

    const deviceIds = userDevices.map(d => d.id);

    if (deviceIds.length === 0) {
      return {
        total_measurements: 0,
        avg_co_ppm: 0,
        avg_co2_gph: 0,
        max_co_ppm: 0,
        max_co2_gph: 0,
        devices_count: 0
      };
    }

    // Construir filtros
    const whereClause = {
      device_id: device_id || { [Op.in]: deviceIds }
    };

    if (start_date || end_date) {
      whereClause.createdAt = {};
      if (start_date) whereClause.createdAt[Op.gte] = new Date(start_date);
      if (end_date) whereClause.createdAt[Op.lte] = new Date(end_date);
    }

    // Agregações
    const summary = await db.Measurement.findOne({
      where: whereClause,
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'total_measurements'],
        [db.sequelize.fn('AVG', db.sequelize.col('co_ppm')), 'avg_co_ppm'],
        [db.sequelize.fn('AVG', db.sequelize.col('co2_gph')), 'avg_co2_gph'],
        [db.sequelize.fn('MAX', db.sequelize.col('co_ppm')), 'max_co_ppm'],
        [db.sequelize.fn('MAX', db.sequelize.col('co2_gph')), 'max_co2_gph']
      ],
      raw: true
    });

    return {
      total_measurements: parseInt(summary.total_measurements) || 0,
      avg_co_ppm: parseFloat(summary.avg_co_ppm).toFixed(2) || 0,
      avg_co2_gph: parseFloat(summary.avg_co2_gph).toFixed(2) || 0,
      max_co_ppm: parseFloat(summary.max_co_ppm).toFixed(2) || 0,
      max_co2_gph: parseFloat(summary.max_co2_gph).toFixed(2) || 0,
      devices_count: deviceIds.length
    };
  }
}

module.exports = new MeasurementsService();