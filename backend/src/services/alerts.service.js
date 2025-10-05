const { Alert, Device, User } = require('../database/models');
const { Op } = require('sequelize');

class AlertsService {
  // Determinar tipo de alerta baseado nos níveis de CO
  determineAlertType(co_ppm) {
    const CO_LIMIT_WARNING = 50;     // PPM - LED amarelo 🟡
    const CO_LIMIT_CRITICAL = 100;   // PPM - LED vermelho 🔴

    if (co_ppm > CO_LIMIT_CRITICAL) {
      return 'crítico'; // LED vermelho 🔴
    } else if (co_ppm > CO_LIMIT_WARNING) {
      return 'alerta';  // LED amarelo 🟡
    } else {
      return 'positivo'; // LED verde 🟢
    }
  }

  // ✨ NOVO: Calcular nível de emissão em porcentagem (0-100%)
  calculateEmissionLevel(co_ppm) {
    const MAX_CO_DISPLAY = 200; // PPM máximo para cálculo (100%)
    
    // Calcular porcentagem baseado no nível de CO
    let percentage = (co_ppm / MAX_CO_DISPLAY) * 100;
    
    // Garantir que fica entre 0 e 100
    percentage = Math.min(Math.max(percentage, 0), 100);
    
    return Math.round(percentage); // Arredondar para inteiro
  }

  // Buscar último alerta do dispositivo
  async getLastAlertForDevice(device_id) {
    const device = await Device.findByPk(device_id);
    if (!device) return null;

    const lastAlert = await Alert.findOne({
      where: { user_id: device.user_id },
      order: [['created_at', 'DESC']],
      limit: 1
    });

    return lastAlert;
  }

  // Criar alerta automaticamente quando LED muda de cor
  async checkAndCreateAlert(measurement, device) {
    const { co_ppm, co2_gph } = measurement;
    const user_id = device.user_id;

    // Determinar tipo de alerta atual
    const currentAlertType = this.determineAlertType(co_ppm);
    
    // ✨ NOVO: Calcular nível de emissão
    const emission_level = this.calculateEmissionLevel(co_ppm);

    // Buscar último alerta do usuário para este dispositivo
    const lastAlert = await this.getLastAlertForDevice(device.id);

    // Se não há alerta anterior OU a cor do LED mudou
    if (!lastAlert || lastAlert.type !== currentAlertType) {
      // Criar mensagem descritiva
      let message = '';
      
      if (currentAlertType === 'crítico') {
        message = `Saldo negativo! CO em ${co_ppm} PPM no dispositivo "${device.name}".`;
      } else if (currentAlertType === 'alerta') {
        message = `Emissão em alerta! CO em ${co_ppm} PPM no dispositivo "${device.name}".`;
      } else {
        message = `Sua emissão de CO está normal: ${co_ppm} PPM no dispositivo "${device.name}".`;
      }

      // ✨ NOVO: Criar alerta com emission_level
      const alert = await Alert.create({
        user_id,
        type: currentAlertType,
        message,
        emission_level // Porcentagem para a barra
      });

      return alert;
    }

    return null; // Sem mudança de estado, não cria alerta
  }

  // Listar alertas do usuário autenticado
  async getAlertsByUser(userId, filters = {}) {
    const { type, limit = 50, offset = 0 } = filters;

    const whereClause = { user_id: userId };
    
    if (type) {
      whereClause.type = type;
    }

    const { count, rows: alerts } = await Alert.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return {
      alerts,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    };
  }

  // Obter estatísticas de alertas
  async getAlertStats(userId) {
    const [positivos, alertas, criticos] = await Promise.all([
      Alert.count({ where: { user_id: userId, type: 'positivo' } }),
      Alert.count({ where: { user_id: userId, type: 'alerta' } }),
      Alert.count({ where: { user_id: userId, type: 'crítico' } })
    ]);

    return {
      positivos,
      alertas,
      criticos,
      total: positivos + alertas + criticos
    };
  }
}

module.exports = new AlertsService();