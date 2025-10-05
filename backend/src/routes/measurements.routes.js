const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurements.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

// ROTA IOT (SEM AUTENTICAÇÃO) - PARA ESP32
// POST /api/measurements/iot - Dispositivo IoT envia medição
router.post(
  '/iot',
  validateRequest(['device_id', 'co_ppm', 'co2_gph']),
  measurementsController.createMeasurementIoT
);

// ROTAS PROTEGIDAS (COM AUTENTICAÇÃO)
// Aplicar autenticação em todas as rotas abaixo
router.use(authMiddleware);

// POST /api/measurements - Dispositivo IoT envia medição (com autenticação)
router.post(
  '/',
  validateRequest(['device_id', 'co_ppm', 'co2_gph']),
  measurementsController.createMeasurement
);

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