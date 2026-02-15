import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock3, Coins, Percent, Radiation } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import PageHeader from '../components/Dashboard/PageHeader';
import MetricCard from '../components/Dashboard/MetricCard';
import EmissionsChart from '../components/Dashboard/EmissionsChart';
import DeviceCard from '../components/Dashboard/DeviceCard';
import HistoryTable from '../components/Dashboard/HistoryTable';
import AlertsList from '../components/Dashboard/AlertsList';
import {
  scrollReveal,
  staggerContainer
} from '../utils/animations';

const Dashboard = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState('Maio');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('all');
  const [selectedRange, setSelectedRange] = useState('Ultimos 7 dias');

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

  const metrics = [
    { id: 'co', icon: Percent, title: 'Concentracao de CO', value: '45 PPM' },
    { id: 'co2', icon: Radiation, title: 'Emissao CO2e (g/h)', value: '460 g/h' },
    { id: 'daily', icon: Clock3, title: 'Total Diario (8h)', value: '3.68 Kg CO2e' },
    { id: 'credits', icon: Coins, title: 'Creditos de Carbono', value: '0.0036' }
  ];

  const [chartData] = useState([
    { day: 'Dom', value: 210 },
    { day: 'Seg', value: 340 },
    { day: 'Ter', value: 420 },
    { day: 'Qua', value: 300 },
    { day: 'Qui', value: 360 },
    { day: 'Sex', value: 470 },
    { day: 'Sab', value: 330 }
  ]);

  const [devices] = useState([
    { id: 'ID 0001', status: 'connected' },
    { id: 'ID 0002', status: 'disconnected' }
  ]);

  const [alerts] = useState([
    {
      id: 'a1',
      title: 'Sua emissao de CO esta controlada',
      time: '2 dias',
      progress: 25,
      progressClass: 'w-16',
      variant: 'success'
    },
    {
      id: 'a2',
      title: 'Emissao em alerta',
      time: '7 dias',
      progress: 50,
      progressClass: 'w-32',
      variant: 'warning'
    },
    {
      id: 'a3',
      title: 'Saldo negativo',
      time: '2 semanas',
      progress: 85,
      progressClass: 'w-56',
      variant: 'critical'
    }
  ]);

  const [historyRows] = useState([
    { id: 'h1', route: 'BRA -> ARG', duration: '057:32 Horas', credits: '+0.0027', status: 'positive' },
    { id: 'h2', route: 'CHI -> EUA', duration: '312:04 Horas', credits: '+0.0012', status: 'critical' },
    { id: 'h3', route: 'HOL -> ALE', duration: '025:17 Horas', credits: '-0.0004', status: 'warning' }
  ]);

  const filteredHistoryRows = historyStatusFilter === 'all'
    ? historyRows
    : historyRows.filter((row) => row.status === historyStatusFilter);

  return (
    <div className="min-h-screen bg-gray-50 font-['Manrope'] text-gray-900">
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

        <main className="ml-72 min-h-screen flex-1 px-4 pb-8 pt-6 md:px-6" aria-label="Conteudo principal do dashboard">
          <PageHeader
            title="Dashboard"
            description="Visualize os niveis de emissao em tempo real, historico recente e principais alertas"
            month={month}
            baseMonth="Maio"
            onMonthChange={setMonth}
          />

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            aria-label="Metricas principais"
          >
            {metrics.map((metric) => (
              <MetricCard key={metric.id} icon={metric.icon} title={metric.title} value={metric.value} />
            ))}
          </motion.section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <EmissionsChart
              data={chartData}
              selectedRange={selectedRange}
              onRangeChange={setSelectedRange}
            />

            <motion.section
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-lg border border-gray-200 bg-white p-5"
              aria-labelledby="devices-title"
            >
              <header className="mb-4 flex items-center justify-between">
                <h2 id="devices-title" className="text-base font-bold font-['Manrope'] text-gray-900">
                  Dispositivos
                </h2>
                <button
                  type="button"
                  className="text-sm font-semibold font-['Manrope'] text-gray-400 transition-colors hover:text-gray-600"
                  aria-label="Ver todos os dispositivos"
                >
                  Ver todos
                </button>
              </header>

              <div className="mb-4 h-px w-full bg-zinc-100" />

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {devices.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </motion.ul>
            </motion.section>
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <HistoryTable
              rows={filteredHistoryRows}
              statusFilter={historyStatusFilter}
              onStatusFilterChange={setHistoryStatusFilter}
            />
            <AlertsList alerts={alerts} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
