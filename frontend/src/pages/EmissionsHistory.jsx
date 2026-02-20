import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HistoryPageHeader from '../components/EmissionsHistory/HistoryPageHeader';
import HistoryTable from '../components/EmissionsHistory/HistoryTable';
import RouteDetailsDrawer from '../components/EmissionsHistory/RouteDetailsDrawer';

const historyRowsSeed = [
  { id: 'h1', route: 'BRA -> ARG', departurePort: 'Santos', arrivalPort: 'Buenos Aires', duration: '057:32 Horas', departureAt: '03/10/2025 08:00', arrivalAt: '05/10/2025 17:32', captain: 'Cap. Lucas Moreira', deviceId: 'ID 0001', vessel: 'NauticAir Alpha', fuelType: 'Diesel Maritimo', avgSpeedKn: '21 nos', totalCo2Kg: '1.28 kg', weather: 'Ceu limpo', credits: '+ 0.0027', status: 'positive', statusLabel: 'Positivo', notes: 'Operacao estavel durante todo o trecho, sem desvios.' },
  { id: 'h2', route: 'CHI -> EUA', departurePort: 'Valparaiso', arrivalPort: 'Los Angeles', duration: '312:04 Horas', departureAt: '10/10/2025 06:30', arrivalAt: '23/10/2025 06:34', captain: 'Cap. Lucas Moreira', deviceId: 'ID 0001', vessel: 'NauticAir Alpha', fuelType: 'Diesel Maritimo', avgSpeedKn: '17 nos', totalCo2Kg: '4.92 kg', weather: 'Ventos fortes', credits: '+ 0.0012', status: 'critical', statusLabel: 'Critico', notes: 'Consumo elevado em trechos com mar agitado.' },
  { id: 'h3', route: 'HOL -> ALE', departurePort: 'Rotterdam', arrivalPort: 'Hamburgo', duration: '025:17 Horas', departureAt: '15/10/2025 09:10', arrivalAt: '16/10/2025 10:27', captain: 'Cap. Rafael Santos', deviceId: 'ID 0002', vessel: 'NauticAir Beta', fuelType: 'Diesel Maritimo', avgSpeedKn: '19 nos', totalCo2Kg: '0.84 kg', weather: 'Nublado', credits: '- 0.0004', status: 'warning', statusLabel: 'Alerta', notes: 'Oscilacao de emissao no trecho final da viagem.' },
  { id: 'h4', route: 'EUA -> JPN', departurePort: 'Seattle', arrivalPort: 'Toquio', duration: '420:00 Horas', departureAt: '18/10/2025 11:00', arrivalAt: '05/11/2025 23:00', captain: 'Cap. Camila Ferreira', deviceId: 'ID 0001', vessel: 'NauticAir Gamma', fuelType: 'GNL', avgSpeedKn: '16 nos', totalCo2Kg: '5.77 kg', weather: 'Frente fria', credits: '+ 0.0008', status: 'positive', statusLabel: 'Confirmado', notes: 'Rota longa com boa eficiencia de combustivel.' },
  { id: 'h5', route: 'CAN -> MEX', departurePort: 'Vancouver', arrivalPort: 'Manzanillo', duration: '085:10 Horas', departureAt: '08/11/2025 07:30', arrivalAt: '11/11/2025 20:40', captain: 'Cap. Bruno de Oliveira', deviceId: 'ID 0002', vessel: 'NauticAir Beta', fuelType: 'Diesel Maritimo', avgSpeedKn: '18 nos', totalCo2Kg: '2.11 kg', weather: 'Moderado', credits: '+ 0.0003', status: 'positive', statusLabel: 'Confirmado', notes: 'Viagem dentro da previsao operacional.' },
  { id: 'h6', route: 'AUS -> NZL', departurePort: 'Sydney', arrivalPort: 'Auckland', duration: '030:45 Horas', departureAt: '12/11/2025 05:50', arrivalAt: '13/11/2025 12:35', captain: 'Cap. Lucas Moreira', deviceId: 'ID 0001', vessel: 'NauticAir Alpha', fuelType: 'Diesel Maritimo', avgSpeedKn: '20 nos', totalCo2Kg: '0.95 kg', weather: 'Chuva fraca', credits: '- 0.0001', status: 'warning', statusLabel: 'Alerta', notes: 'Pico de emissao em janela de manobra no porto.' },
  { id: 'h7', route: 'FRA -> ITA', departurePort: 'Marselha', arrivalPort: 'Genova', duration: '008:20 Horas', departureAt: '15/11/2025 14:00', arrivalAt: '15/11/2025 22:20', captain: 'Cap. Rafael Santos', deviceId: 'ID 0001', vessel: 'NauticAir Gamma', fuelType: 'GNL', avgSpeedKn: '23 nos', totalCo2Kg: '0.42 kg', weather: 'Ceu limpo', credits: '+ 0.0005', status: 'positive', statusLabel: 'Confirmado', notes: 'Rota curta com excelente desempenho ambiental.' },
  { id: 'h8', route: 'IND -> CHN', departurePort: 'Mumbai', arrivalPort: 'Xangai', duration: '065:50 Horas', departureAt: '18/11/2025 10:15', arrivalAt: '21/11/2025 04:05', captain: 'Cap. Camila Ferreira', deviceId: 'ID 0001', vessel: 'NauticAir Alpha', fuelType: 'Diesel Maritimo', avgSpeedKn: '17 nos', totalCo2Kg: '1.89 kg', weather: 'Umido', credits: '+ 0.0002', status: 'positive', statusLabel: 'Confirmado', notes: 'Sem ocorrencias de risco durante o trajeto.' },
  { id: 'h9', route: 'RUS -> DEU', departurePort: 'Sao Petersburgo', arrivalPort: 'Kiel', duration: '040:15 Horas', departureAt: '22/11/2025 09:40', arrivalAt: '24/11/2025 01:55', captain: 'Cap. Bruno de Oliveira', deviceId: 'ID 0002', vessel: 'NauticAir Beta', fuelType: 'Diesel Maritimo', avgSpeedKn: '15 nos', totalCo2Kg: '1.37 kg', weather: 'Frio intenso', credits: '- 0.0003', status: 'critical', statusLabel: 'Critico', notes: 'Consumo acima da meta devido a condicoes climaticas severas.' },
  { id: 'h10', route: 'ARG -> PRT', departurePort: 'Buenos Aires', arrivalPort: 'Lisboa', duration: '110:30 Horas', departureAt: '25/11/2025 06:20', arrivalAt: '29/11/2025 20:50', captain: 'Cap. Lucas Moreira', deviceId: 'ID 0002', vessel: 'NauticAir Gamma', fuelType: 'GNL', avgSpeedKn: '18 nos', totalCo2Kg: '2.66 kg', weather: 'Vento lateral', credits: '+ 0.0006', status: 'positive', statusLabel: 'Confirmado', notes: 'Trajeto otimizado com bom aproveitamento de rota.' }
];

const parseCredits = (credits) => {
  const normalized = credits.replace(/\s/g, '').replace(',', '.');
  return Number.parseFloat(normalized) || 0;
};

const EmissionsHistory = () => {
  const navigate = useNavigate();
  const { historyId } = useParams();
  const [rows] = useState(historyRowsSeed);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const pageSize = 8;

  const visibleRows = useMemo(() => {
    const filtered = statusFilter === 'all'
      ? rows
      : rows.filter((row) => row.status === statusFilter);

    return [...filtered].sort((a, b) => {
      const valueA = parseCredits(a.credits);
      const valueB = parseCredits(b.credits);
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }, [rows, statusFilter, sortDirection]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(visibleRows.length / pageSize)), [visibleRows.length]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return visibleRows.slice(start, start + pageSize);
  }, [visibleRows, currentPage]);

  const selectedRow = useMemo(() => {
    if (!historyId) return null;
    return rows.find((row) => row.id === historyId) || null;
  }, [historyId, rows]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortDirection]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleToggleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleReset = () => {
    setStatusFilter('all');
    setSortDirection('desc');
  };

  const handleOpenDetails = (row) => {
    navigate(`/dashboard/history/${row.id}`);
  };

  const handleCloseDetails = () => {
    navigate('/dashboard/history');
  };

  return (
    <div className="space-y-4">
      <HistoryPageHeader
        filter={statusFilter}
        onFilterChange={setStatusFilter}
        sortDirection={sortDirection}
        onToggleSort={handleToggleSort}
        onReset={handleReset}
      />

      {isLoading && (
        <section className="rounded-lg border border-zinc-100 bg-white p-8 text-center text-sm font-medium font-['Manrope'] text-slate-500">
          Carregando historico...
        </section>
      )}

      {!isLoading && error && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm font-medium font-['Manrope'] text-red-700">
          {error}
        </section>
      )}

      {!isLoading && !error && (
        <HistoryTable
          rows={paginatedRows}
          onView={handleOpenDetails}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <RouteDetailsDrawer isOpen={Boolean(historyId)} data={selectedRow} onClose={handleCloseDetails} />
    </div>
  );
};

export default EmissionsHistory;
