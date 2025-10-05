require('dotenv').config();
const http = require('http');
const app = require('./app');
const db = require('./database/models');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Importante para Render

async function startServer() {
  try {
    // Testar conexão com o banco de dados
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados PostgreSQL');

    // Criar servidor HTTP
    const server = http.createServer(app);

    // Iniciar o servidor
    server.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor NauticAir rodando na porta ${PORT}`);
      console.log(`📊 API disponível em http://localhost:${PORT}/api`);
    });

    // Tratamento de erros
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Rejeição não tratada:', reason);
      process.exit(1);
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Exceção não capturada:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();