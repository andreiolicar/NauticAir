const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurements.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

// POST /api/measurements - Dispositivo IoT envia medição (sem autenticação de usuário)
// Nota: Em produção, usar autenticação por API Key do dispositivo
router.post(
  '/',
  validateRequest(['device_id', 'co_ppm', 'co2_gph']),
  measurementsController.createMeasurement
);

// Rotas protegidas (usuário logado)
router.use(authMiddleware);

// GET /api/measurements/summary - Dados agregados (deve vir ANTES de /:id)
router.get(
  '/summary',
  measurementsController.getMeasurementsSummary
);

// GET /api/measurements - Listar medições com filtros
router.get(
  '/',
  measurementsController.getMeasurements
);

module.exports = router;