const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');

// POST /api/auth/register - Registrar novo usuário
router.post(
  '/register',
  validateRequest(['name', 'email', 'password']),
  authController.register
);

// POST /api/auth/login - Login
router.post(
  '/login',
  validateRequest(['email', 'password']),
  authController.login
);

// GET /api/auth/me - Buscar dados do usuário autenticado (protegida)
router.get(
  '/me',
  authMiddleware,
  authController.getMe
);

// POST /api/auth/verify-2fa - Verificar código 2FA (futuro)
router.post(
  '/verify-2fa',
  validateRequest(['code']),
  authController.verify2FA
);

module.exports = router;