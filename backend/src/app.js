const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Importação e uso das rotas - Por enquanto não há rotas criadas para usar aqui.
// As rotas ficarão organizadas na pasta routes, importadas aqui assim que disponíveis.
// Exemplo:
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/user', require('./routes/user.routes'));

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API NauticAir rodando' });
});

module.exports = app;