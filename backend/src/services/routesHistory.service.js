const { RoutesHistory, Device } = require('../database/models');
const { Op } = require('sequelize');

class RoutesHistoryService {
  /**
   * Cria uma nova rota no histórico
   * @param {string} userId - ID do usuário
   * @param {object} routeData - Dados da rota
   * @returns {object} - Rota criada
   */
  async createRoute(userId, routeData) {
    const { route, duration_h, responsible, device_id, co2_credits, status } = routeData;

    // Validar se o dispositivo existe e pertence ao usuário
    const device = await Device.findOne({
      where: { id: device_id, user_id: userId },
    });

    if (!device) {
      throw new Error('Dispositivo não encontrado ou não pertence ao usuário');
    }

    // Criar rota
    const newRoute = await RoutesHistory.create({
      user_id: userId,
      route,
      duration_h,
      responsible,
      device_id,
      co2_credits,
      status,
    });

    return newRoute;
  }

  /**
   * Busca histórico de rotas do usuário com filtros e paginação
   * @param {string} userId - ID do usuário
   * @param {object} filters - Filtros opcionais
   * @returns {object} - Lista de rotas e paginação
   */
  async getRoutesByUser(userId, filters = {}) {
    const { status, device_id, limit = 50, offset = 0 } = filters;

    // Construir query WHERE
    const where = { user_id: userId };

    if (status) {
      where.status = status;
    }

    if (device_id) {
      where.device_id = device_id;
    }

    // Buscar rotas
    const { count, rows: routes } = await RoutesHistory.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']], // Mais recentes primeiro
      include: [
        {
          model: Device,
          attributes: ['id', 'name'],
        },
      ],
    });

    return {
      routes,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
    };
  }

  /**
   * Busca estatísticas de rotas do usuário (opcional)
   * @param {string} userId - ID do usuário
   * @returns {object} - Estatísticas
   */
  async getRouteStats(userId) {
    const routes = await RoutesHistory.findAll({
      where: { user_id: userId },
      attributes: ['status', 'co2_credits'],
    });

    const stats = {
      total: routes.length,
      positivos: routes.filter((r) => r.status === 'positivo').length,
      confirmados: routes.filter((r) => r.status === 'confirmado').length,
      alertas: routes.filter((r) => r.status === 'alerta').length,
      criticos: routes.filter((r) => r.status === 'crítico').length,
      total_co2_credits: routes.reduce((sum, r) => sum + parseFloat(r.co2_credits), 0),
    };

    return stats;
  }
}

module.exports = new RoutesHistoryService();