const express = require('express');
const router = express.Router();
const devicesController = require('../controllers/devices.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

// Todas as rotas de dispositivos são protegidas
router.use(authMiddleware);

// POST /api/devices - Cadastrar dispositivo IoT
router.post(
  '/',
  validateRequest(['name']),  // ← REMOVIDO 'type'
  devicesController.createDevice
);

// GET /api/devices - Listar dispositivos do usuário
router.get(
  '/',
  devicesController.getDevices
);

// PUT /api/devices/:id - Atualizar dispositivo
router.put(
  '/:id',
  devicesController.updateDevice
);

// DELETE /api/devices/:id - Remover dispositivo
router.delete(
  '/:id',
  devicesController.deleteDevice
);

module.exports = router;