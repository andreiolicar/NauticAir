const devicesService = require('../services/devices.service');

class DevicesController {
  // POST /api/devices - Cadastrar dispositivo IoT
  async createDevice(req, res, next) {
    try {
      const { name, status } = req.body;
      const userId = req.user.id;

      const device = await devicesService.createDevice(
        { name, status },
        userId
      );

      res.status(201).json({
        success: true,
        message: 'Dispositivo IoT cadastrado com sucesso',
        data: device
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/devices - Listar dispositivos do usuário
  async getDevices(req, res, next) {
    try {
      const userId = req.user.id;

      const devices = await devicesService.getDevices(userId);

      res.status(200).json({
        success: true,
        data: devices
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/devices/:id - Atualizar dispositivo
  async updateDevice(req, res, next) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const userId = req.user.id;

      const device = await devicesService.updateDevice(
        id,
        { name, status },
        userId
      );

      res.status(200).json({
        success: true,
        message: 'Dispositivo atualizado com sucesso',
        data: device
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/devices/:id - Remover dispositivo
  async deleteDevice(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await devicesService.deleteDevice(id, userId);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DevicesController();