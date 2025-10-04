const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/models');

class AuthService {
  // Registrar novo usuário
  async register(userData) {
    const { name, email, password } = userData;

    // Verificar se email já existe
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email já cadastrado');
      error.statusCode = 409;
      throw error;
    }

    // Hash da senha
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const user = await db.User.create({
      name,
      email,
      password_hash,
      is_2fa_enabled: false
    });

    // Gerar token JWT
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_2fa_enabled: user.is_2fa_enabled
      },
      token
    };
  }

  // Login de usuário
  async login(credentials) {
    const { email, password } = credentials;

    // Buscar usuário por email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Email ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      const error = new Error('Email ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    // Gerar token JWT
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_2fa_enabled: user.is_2fa_enabled
      },
      token
    };
  }

  // Buscar dados do usuário autenticado
  async getMe(userId) {
    const user = await db.User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'is_2fa_enabled', 'createdAt']
    });

    if (!user) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  // Gerar token JWT
  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
}

module.exports = new AuthService();