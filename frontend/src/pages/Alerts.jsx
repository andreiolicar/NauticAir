import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import AlertsPageHeader from '../components/Alerts/AlertsPageHeader';
import AlertsFeed from '../components/Alerts/AlertsFeed';
import AlertDetailsDrawer from '../components/Alerts/AlertDetailsDrawer';
import {
  fetchMeasurementByAlertId,
  formatTimeLabel,
  getAgeInDays,
  hasAlertDetails,
  mapMeasurementToAlert,
  normalizeStatus
} from '../utils/alerts';

const Alerts = () => {
  const navigate = useNavigate();
  const { alertId } = useParams();
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recent');
  const [activeAlertDetails, setActiveAlertDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const validFilters = new Set(['all', 'critical', 'positive', 'warning']);

  const sidebarSections = [
    {
      title: 'Menu Principal',
      items: [
        { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
        { key: 'alerts', label: 'Alertas', to: '/dashboard/alerts' },
        { key: 'devices', label: 'Dispositivos', to: '/dashboard/devices' },
        { key: 'history', label: 'Historico', to: '/dashboard/history' }
      ]
    },
    {
      title: 'Outros',
      items: [{ key: 'settings', label: 'Configuracoes', to: '/dashboard/settings' }]
    }
  ];

  const [alerts] = useState([
    {
      id: 'a1',
      title: 'Sua emissao de CO esta controlada',
      timeLabel: '2 Dias',
      ageDays: 2,
      progressClass: 'w-16',
      status: 'positive',
      deviceId: '9856baa0-2cff-4d14-b9c9-b9b97739a00c',
      coPpm: 45.3,
      co2Gph: 120.5,
      durationH: 2.5,
      createdAt: '2025-10-03T10:15:30.000Z'
    },
    {
      id: 'a2',
      title: 'Emissao em alerta!',
      timeLabel: '7 Dias',
      ageDays: 7,
      progressClass: 'w-32',
      status: 'warning',
      deviceId: '9856baa0-2cff-4d14-b9c9-b9b97739a00c'
    },
    {
      id: 'a3',
      title: 'Saldo negativo!',
      timeLabel: '2 Semanas',
      ageDays: 14,
      progressClass: 'w-56',
      status: 'critical',
      deviceId: '2ccdb91e-4f6f-40d0-8fd9-22345e000001'
    },
    {
      id: 'a4',
      title: 'Sua emissao de CO esta controlada',
      timeLabel: '2 Dias',
      ageDays: 2,
      progressClass: 'w-16',
      status: 'positive',
      deviceId: '9856baa0-2cff-4d14-b9c9-b9b97739a00c',
      coPpm: 42.1,
      co2Gph: 115.7,
      durationH: 2.8,
      createdAt: '2025-10-04T09:00:00.000Z'
    },
    {
      id: 'a5',
      title: 'Sua emissao de CO esta controlada',
      timeLabel: '2 Dias',
      ageDays: 2,
      progressClass: 'w-16',
      status: 'positive',
      deviceId: '9856baa0-2cff-4d14-b9c9-b9b97739a00c'
    },
    {
      id: 'a6',
      title: 'Emissao em alerta!',
      timeLabel: '7 Dias',
      ageDays: 7,
      progressClass: 'w-32',
      status: 'warning',
      deviceId: '9856baa0-2cff-4d14-b9c9-b9b97739a00c'
    }
  ]);

  const alertsById = useMemo(() => {
    return new Map(alerts.map((alert) => [alert.id, alert]));
  }, [alerts]);

  const selectedAlert = alertId ? alertsById.get(alertId) : null;

  useEffect(() => {
    let isCancelled = false;

    const loadDetails = async () => {
      if (!alertId) {
        setActiveAlertDetails(null);
        setDetailsError(null);
        setIsDetailsLoading(false);
        return;
      }

      if (!selectedAlert) {
        setActiveAlertDetails(null);
        setDetailsError('Alerta nao encontrado.');
        setIsDetailsLoading(false);
        return;
      }

      setDetailsError(null);

      if (hasAlertDetails(selectedAlert)) {
        setActiveAlertDetails(selectedAlert);
        setIsDetailsLoading(false);
        return;
      }

      setActiveAlertDetails(selectedAlert);
      setIsDetailsLoading(true);

      try {
        const payload = await fetchMeasurementByAlertId(alertId);
        if (isCancelled) return;

        const mapped = mapMeasurementToAlert(payload, {
          id: selectedAlert.id,
          deviceId: selectedAlert.deviceId,
          title: selectedAlert.title,
          status: selectedAlert.status,
          progressClass: selectedAlert.progressClass
        });

        setActiveAlertDetails(mapped);
      } catch (error) {
        if (isCancelled) return;
        setDetailsError(error.message || 'Falha ao carregar detalhes do alerta.');
      } finally {
        if (!isCancelled) setIsDetailsLoading(false);
      }
    };

    loadDetails();

    return () => {
      isCancelled = true;
    };
  }, [alertId, selectedAlert]);

  const handleStatusFilterChange = (value) => {
    const normalized = normalizeStatus(value);
    setStatusFilter(validFilters.has(normalized) ? normalized : 'all');
  };

  const visibleAlerts = useMemo(() => {
    const normalizedFilter = normalizeStatus(statusFilter);
    const filtered = normalizedFilter === 'all'
      ? alerts
      : alerts.filter((alert) => normalizeStatus(alert.status) === normalizedFilter);

    return [...filtered].sort((a, b) => {
      const primary = sortOrder === 'recent'
        ? a.ageDays - b.ageDays
        : b.ageDays - a.ageDays;

      if (primary !== 0) return primary;
      return a.id.localeCompare(b.id);
    });
  }, [alerts, sortOrder, statusFilter]);

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'recent' ? 'oldest' : 'recent'));
  };

  const handleReset = () => {
    setStatusFilter('all');
    setSortOrder('recent');
  };

  const handleOpenDetails = (id) => {
    navigate(`/dashboard/alerts/${id}`);
  };

  const handleCloseDetails = () => {
    navigate('/dashboard/alerts');
  };

  const handleRetryDetails = async () => {
    if (!alertId || !selectedAlert) return;

    setDetailsError(null);
    setIsDetailsLoading(true);

    try {
      const payload = await fetchMeasurementByAlertId(alertId);
      const mapped = mapMeasurementToAlert(payload, {
        id: selectedAlert.id,
        deviceId: selectedAlert.deviceId,
        title: selectedAlert.title,
        status: selectedAlert.status,
        progressClass: selectedAlert.progressClass,
        timeLabel: selectedAlert.timeLabel || formatTimeLabel(payload?.data?.createdAt),
        ageDays: selectedAlert.ageDays || getAgeInDays(payload?.data?.createdAt)
      });

      setActiveAlertDetails(mapped);
    } catch (error) {
      setDetailsError(error.message || 'Falha ao carregar detalhes do alerta.');
    } finally {
      setIsDetailsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-['Manrope'] text-slate-900">
      <div className="flex min-h-screen w-full">
        <Sidebar
          sections={sidebarSections}
          profile={{
            name: 'Andrei Carneiro',
            email: 'andreicarneiro@email.com',
            initials: 'AC'
          }}
          onLogout={() => navigate('/login')}
          onEditProfile={() => navigate('/dashboard/settings')}
        />

        <main className="ml-72 min-h-screen flex-1 px-4 pb-8 pt-6 md:px-6" aria-label="Conteudo principal de alertas">
          <AlertsPageHeader
            title="Alertas"
            description="Visualize o historico completo de alertas"
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            onToggleSort={handleToggleSort}
            onReset={handleReset}
          />

          <section className="mt-4">
            <AlertsFeed
              alerts={visibleAlerts}
              listKey={`${statusFilter}-${sortOrder}`}
              onOpenDetails={handleOpenDetails}
            />
          </section>
        </main>
      </div>

      <AlertDetailsDrawer
        isOpen={Boolean(alertId)}
        alertId={alertId}
        alertData={activeAlertDetails}
        isLoading={isDetailsLoading}
        error={detailsError}
        onClose={handleCloseDetails}
        onRetry={handleRetryDetails}
      />
    </div>
  );
};

export default Alerts;
