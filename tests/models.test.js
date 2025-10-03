require('dotenv').config();
const db = require('../src/database/models');

describe('Testes básicos dos modelos NauticAir', () => {
  beforeAll(async () => {
    // Deixa certeza que as tabelas estão sincronizadas (não perde dados com force=false)
    await db.sequelize.sync({ force: false });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('Criar usuário admin e validar', async () => {
    const User = db.User;

    const user = await User.create({
      name: 'Tester',
      email: 'tester@nauticair.com',
      password_hash: 'fake_hash',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Tester');
    expect(user.email).toBe('tester@nauticair.com');

    // Remove o teste para não poluir a base
    await user.destroy();
  });

  test('Criar dispositivo e associar usuário', async () => {
    const User = db.User;
    const Device = db.Device;

    const user = await User.create({
      name: 'Device Test User',
      email: 'devicetest@nauticair.com',
      password_hash: 'fake_hash',
    });

    const device = await Device.create({
      user_id: user.id,
      name: 'Test Device',
      status: 'connected',
    });

    expect(device).toHaveProperty('id');
    expect(device.user_id).toEqual(user.id);
    expect(device.name).toBe('Test Device');
    expect(device.status).toBe('connected');

    // Cleanup
    await device.destroy();
    await user.destroy();
  });
});