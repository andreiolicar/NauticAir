export const mapDeviceToDetails = (device) => {
  if (!device) return null;

  return {
    id: device.id,
    status: device.status,
    image: device.image,
    schedule: device.schedule,
    hours: device.hours,
    cost: device.cost,
    description: device.description || 'Sem descricao cadastrada.',
    info1: device.info1,
    info2: device.info2,
    info3: device.info3,
    createdAt: device.createdAt || new Date().toISOString()
  };
};

const mockDeviceDetails = {
  'ID 0001': {
    description: 'Sensor principal de emissao para operacao em rota internacional.',
    info1: 'Operacao padrao',
    info2: 'CO2e Monitor',
    info3: 'Acuracia 98%'
  },
  'ID 0002': {
    description: 'Dispositivo reserva aguardando manutencao tecnica.',
    info1: 'Modo standby',
    info2: 'Firmware 2.1.0',
    info3: 'Manutencao pendente'
  }
};

export const fetchDeviceDetailsById = async (deviceId) => {
  await new Promise((resolve) => setTimeout(resolve, 450));

  const details = mockDeviceDetails[deviceId];
  if (!details) {
    throw new Error('Nao foi possivel carregar os detalhes deste dispositivo.');
  }

  return {
    success: true,
    message: 'Detalhes do dispositivo carregados',
    data: {
      id: deviceId,
      ...details,
      createdAt: new Date().toISOString()
    }
  };
};
