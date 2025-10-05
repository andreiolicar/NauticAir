const express = require('express');
const router = express.Router();
const { getAlerts, getAlertStats } = require('../controllers/alerts.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

// GET /api/alerts - Listar alertas do usuário
router.get('/', getAlerts);

// GET /api/alerts/stats - Estatísticas de alertas
router.get('/stats', getAlertStats);

module.exports = router;