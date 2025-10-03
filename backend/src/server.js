const http = require('http');
const app = require('./app');
const db = require('./database/models');
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Testar conexão com o banco de dados
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados PostgreSQL com Sequelize');

    // Sincronizar models (cuidado em produção - usar migrations ao invés)
    // await db.sequelize.sync();
    // console.log('✅ Models sincronizados com o banco de dados');

    // Criar servidor HTTP com o Express app
    const server = http.createServer(app);

    // Iniciar o servidor HTTP
    server.listen(PORT, () => {
      console.log(`🚀 Servidor NauticAir rodando em http://localhost:${PORT}`);
      console.log(`📊 API disponível em http://localhost:${PORT}/api`);
    });

    // Tratamento de erros não capturados
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Rejeição não tratada em:', promise, 'razão:', reason);
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