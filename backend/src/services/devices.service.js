const db = require('../database/models');

class DevicesService {
  // POST /api/devices - Cadastrar dispositivo IoT NauticAir
  async createDevice(deviceData, userId) {
    const { name, status } = deviceData;

    // Criar dispositivo
    const device = await db.Device.create({
      user_id: userId,
      name: name || 'NauticAir IoT',
      status: status || 'disconnected'
    });

    return device;
  }

  // GET /api/devices - Listar dispositivos do usuário
  async getDevices(userId) {
    const devices = await db.Device.findAll({
      where: { user_id: userId },
      attributes: [
        'id', 
        'name', 
        'status', 
        'createdAt',
        'updatedAt'
      ],
      order: [['createdAt', 'DESC']]
    });

    return devices;
  }

  // PUT /api/devices/:id - Atualizar dispositivo
  async updateDevice(deviceId, deviceData, userId) {
    const device = await db.Device.findOne({
      where: { 
        id: deviceId,
        user_id: userId 
      }
    });

    if (!device) {
      const error = new Error('Dispositivo não encontrado ou não pertence ao usuário');
      error.statusCode = 404;
      throw error;
    }

    // Atualizar apenas campos permitidos
    const { name, status } = deviceData;

    if (name) device.name = name;
    
    // Validar status antes de atualizar
    if (status) {
      if (!['connected', 'disconnected'].includes(status)) {
        const error = new Error('Status inválido. Use: connected ou disconnected');
        error.statusCode = 400;
        throw error;
      }
      device.status = status;
    }

    await device.save();

    return device;
  }

  // DELETE /api/devices/:id - Remover dispositivo
  async deleteDevice(deviceId, userId) {
    const device = await db.Device.findOne({
      where: { 
        id: deviceId,
        user_id: userId 
      }
    });

    if (!device) {
      const error = new Error('Dispositivo não encontrado ou não pertence ao usuário');
      error.statusCode = 404;
      throw error;
    }

    await device.destroy();

    return { message: 'Dispositivo removido com sucesso' };
  }
}

module.exports = new DevicesService();