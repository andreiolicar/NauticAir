const authService = require('../services/auth.service');

class AuthController {
  // POST /api/auth/register
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const result = await authService.register({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/auth/me
  async getMe(req, res, next) {
    try {
      const user = await authService.getMe(req.user.id);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/verify-2fa (placeholder para futuro)
  async verify2FA(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: '2FA ainda não implementado'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();