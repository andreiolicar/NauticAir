require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API NauticAir rodando' });
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

module.exports = app;