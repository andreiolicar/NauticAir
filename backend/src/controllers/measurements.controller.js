const measurementsService = require('../services/measurements.service');

class MeasurementsController {

  // POST /api/measurements - Dispositivo IoT envia medição (COM AUTENTICAÇÃO)
  async createMeasurement(req, res, next) {
    try {
      const { device_id, co_ppm, co2_gph, duration_h } = req.body;

      const measurement = await measurementsService.createMeasurement({
        device_id,
        co_ppm,
        co2_gph,
        duration_h
      });

      res.status(201).json({
        success: true,
        message: 'Medição registrada com sucesso',
        data: measurement
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/measurements/iot - Dispositivo IoT envia medição (SEM AUTENTICAÇÃO)
  async createMeasurementIoT(req, res, next) {
    try {
      const { device_id, co_ppm, co2_gph, duration_h } = req.body;

      const measurement = await measurementsService.createMeasurement({
        device_id,
        co_ppm,
        co2_gph,
        duration_h
      });

      res.status(201).json({
        success: true,
        message: 'Medição registrada com sucesso',
        data: measurement
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/measurements - Listar medições com filtros
  async getMeasurements(req, res, next) {
    try {
      const userId = req.user.id;
      const { device_id, start_date, end_date, limit, offset } = req.query;

      const result = await measurementsService.getMeasurements(userId, {
        device_id,
        start_date,
        end_date,
        limit,
        offset
      });

      res.status(200).json({
        success: true,
        data: result.measurements,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/measurements/summary - Dados agregados para dashboard
  async getMeasurementsSummary(req, res, next) {
    try {
      const userId = req.user.id;
      const { device_id, start_date, end_date } = req.query;

      const summary = await measurementsService.getMeasurementsSummary(userId, {
        device_id,
        start_date,
        end_date
      });

      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeasurementsController();