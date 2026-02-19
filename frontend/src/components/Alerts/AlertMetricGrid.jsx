import AlertDetailsSection from './AlertDetailsSection';

const MetricCell = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
    <p className="text-xs font-medium font-['Manrope'] text-gray-500">{label}</p>
    <p className="mt-1 text-sm font-semibold font-['Manrope'] text-gray-900">{value}</p>
  </div>
);

const AlertMetricGrid = ({ alert }) => {
  return (
    <AlertDetailsSection title="Metrica da medicao">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <MetricCell label="CO (PPM)" value={`${alert.coPpm.toFixed(1)} ppm`} />
        <MetricCell label="CO2e (g/h)" value={`${alert.co2Gph.toFixed(1)} g/h`} />
        <MetricCell label="Duracao (h)" value={`${alert.durationH.toFixed(1)} h`} />
        <MetricCell
          label="Data da medicao"
          value={new Date(alert.createdAt).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
          })}
        />
      </div>
    </AlertDetailsSection>
  );
};

export default AlertMetricGrid;
