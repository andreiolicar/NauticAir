export const normalizeStatus = (value) => {
  const normalized = String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (normalized === 'critico') return 'critical';
  if (normalized === 'positivo') return 'positive';
  if (normalized === 'alerta') return 'warning';
  if (normalized === 'todos' || normalized === 'all') return 'all';

  return normalized;
};

export const getStatusFromMeasurement = (measurement) => {
  if (!measurement) return 'warning';

  const coPpm = Number(measurement.co_ppm || 0);
  const co2Gph = Number(measurement.co2_gph || 0);

  if (coPpm >= 80 || co2Gph >= 220) return 'critical';
  if (coPpm >= 55 || co2Gph >= 150) return 'warning';
  return 'positive';
};

export const formatTimeLabel = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays < 7) return `${diffDays} Dias`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} Semanas`;
  return `${Math.floor(diffDays / 30)} Meses`;
};

export const getAgeInDays = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
};

export const hasAlertDetails = (alert) => {
  if (!alert) return false;
  return (
    Number.isFinite(Number(alert.coPpm)) &&
    Number.isFinite(Number(alert.co2Gph)) &&
    Number.isFinite(Number(alert.durationH)) &&
    Boolean(alert.createdAt) &&
    Boolean(alert.deviceId)
  );
};

export const mapMeasurementToAlert = (payload, fallback = {}) => {
  const measurement = payload?.data || payload;

  const createdAt = measurement?.createdAt || fallback.createdAt || new Date().toISOString();
  const status = fallback.status || getStatusFromMeasurement(measurement);

  return {
    id: measurement?.id || fallback.id,
    deviceId: measurement?.device_id || fallback.deviceId || 'desconhecido',
    status,
    title: fallback.title || 'Nova medicao registrada',
    timeLabel: fallback.timeLabel || formatTimeLabel(createdAt),
    createdAt,
    ageDays: fallback.ageDays || getAgeInDays(createdAt),
    coPpm: Number(measurement?.co_ppm ?? fallback.coPpm ?? 0),
    co2Gph: Number(measurement?.co2_gph ?? fallback.co2Gph ?? 0),
    durationH: Number(measurement?.duration_h ?? fallback.durationH ?? 0),
    progressClass: fallback.progressClass || 'w-24'
  };
};

const mockMeasurements = {
  a1: {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    device_id: '9856baa0-2cff-4d14-b9c9-b9b97739a00c',
    co_ppm: 45.3,
    co2_gph: 120.5,
    duration_h: 2.5,
    createdAt: '2025-10-03T10:15:30.000Z'
  },
  a2: {
    id: 'c8b2f6e9-e5f6-4ab2-83d0-ef1234001111',
    device_id: '9856baa0-2cff-4d14-b9c9-b9b97739a00c',
    co_ppm: 62.1,
    co2_gph: 164.9,
    duration_h: 3.2,
    createdAt: '2025-10-01T08:42:00.000Z'
  },
  a3: {
    id: 'f2aaccd4-62f0-4ce7-aa20-ef1234002222',
    device_id: '2ccdb91e-4f6f-40d0-8fd9-22345e000001',
    co_ppm: 92.8,
    co2_gph: 241.2,
    duration_h: 1.4,
    createdAt: '2025-09-20T06:30:00.000Z'
  }
};

export const fetchMeasurementByAlertId = async (alertId) => {
  await new Promise((resolve) => setTimeout(resolve, 450));

  const key = String(alertId || '').split('-')[0];
  const data = mockMeasurements[key] || mockMeasurements.a1;

  if (!data) {
    throw new Error('Nao foi possivel carregar os detalhes desta medicao.');
  }

  return {
    success: true,
    message: 'Medição registrada com sucesso',
    data
  };
};
