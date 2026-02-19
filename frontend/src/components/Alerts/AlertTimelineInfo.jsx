import AlertDetailsSection from './AlertDetailsSection';

const AlertTimelineInfo = ({ alert }) => {
  return (
    <AlertDetailsSection title="Contexto operacional">
      <dl className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-xs font-medium font-['Manrope'] text-gray-500">ID da medicao</dt>
          <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{alert.id}</dd>
        </div>

        <div className="flex items-start justify-between gap-3">
          <dt className="text-xs font-medium font-['Manrope'] text-gray-500">ID do dispositivo</dt>
          <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{alert.deviceId}</dd>
        </div>

        <div className="flex items-start justify-between gap-3">
          <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Criado em</dt>
          <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">
            {new Date(alert.createdAt).toLocaleString('pt-BR', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </dd>
        </div>
      </dl>
    </AlertDetailsSection>
  );
};

export default AlertTimelineInfo;
