const express = require('express');
const router = express.Router();
const routesHistoryController = require('../controllers/routesHistory.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

// Todas as rotas são protegidas
router.use(authMiddleware);

// POST /api/routes-history - Registrar rota
router.post(
  '/',
  validateRequest(['route', 'duration_h', 'responsible', 'device_id', 'co2_credits', 'status']),
  routesHistoryController.createRoute
);

// GET /api/routes-history/stats - Estatísticas (deve vir ANTES de /)
router.get('/stats', routesHistoryController.getRouteStats);

// GET /api/routes-history - Listar histórico
router.get('/', routesHistoryController.getRoutes);

module.exports = router;