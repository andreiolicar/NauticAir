const AlertsService = require('../services/alerts.service');

// GET /api/alerts - Listar alertas do usuário autenticado
const getAlerts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, limit, offset } = req.query;

    const result = await AlertsService.getAlertsByUser(userId, {
      type,
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      data: result.alerts,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/alerts/stats - Estatísticas de alertas
const getAlertStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const stats = await AlertsService.getAlertStats(userId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlerts,
  getAlertStats
};