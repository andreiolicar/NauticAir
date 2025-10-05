require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const devicesRoutes = require('./routes/devices.routes');
const measurementsRoutes = require('./routes/measurements.routes');
const alertsRoutes = require('./routes/alerts.routes');
const routesHistoryRoutes = require('./routes/routesHistory.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API NauticAir rodando' });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api/measurements', measurementsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/routes-history', routesHistoryRoutes);

// Middleware de erro
app.use(errorHandler);

module.exports = app;