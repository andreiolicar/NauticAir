const routesHistoryService = require('../services/routesHistory.service');

class RoutesHistoryController {
  /**
   * POST /api/routes-history - Criar nova rota
   */
  async createRoute(req, res, next) {
    try {
      const userId = req.user.id; // ID do usuário autenticado
      const routeData = req.body;

      // Validação básica
      const { route, duration_h, responsible, device_id, co2_credits, status } = routeData;

      if (!route || !duration_h || !responsible || !device_id || co2_credits === undefined || !status) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: route, duration_h, responsible, device_id, co2_credits, status',
        });
      }

      // Validar status
      const validStatuses = ['positivo', 'confirmado', 'alerta', 'crítico'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status inválido. Use: positivo, confirmado, alerta ou crítico',
        });
      }

      // Criar rota
      const newRoute = await routesHistoryService.createRoute(userId, routeData);

      return res.status(201).json({
        success: true,
        message: 'Rota registrada com sucesso',
        data: newRoute,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/routes-history - Listar histórico de rotas
   */
  async getRoutes(req, res, next) {
    try {
      const userId = req.user.id;
      const filters = {
        status: req.query.status,
        device_id: req.query.device_id,
        limit: req.query.limit || 50,
        offset: req.query.offset || 0,
      };

      const result = await routesHistoryService.getRoutesByUser(userId, filters);

      return res.status(200).json({
        success: true,
        data: result.routes,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/routes-history/stats - Estatísticas de rotas (opcional)
   */
  async getRouteStats(req, res, next) {
    try {
      const userId = req.user.id;
      const stats = await routesHistoryService.getRouteStats(userId);

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoutesHistoryController();