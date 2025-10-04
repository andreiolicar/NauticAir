const jwt = require('jsonwebtoken');
const db = require('../database/models');

const authMiddleware = async (req, res, next) => {
  try {
    // Buscar token no header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido'
      });
    }

    const token = parts[1];

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuário no banco
    const user = await db.User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'is_2fa_enabled']
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Adicionar usuário ao request para uso nos controllers
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;