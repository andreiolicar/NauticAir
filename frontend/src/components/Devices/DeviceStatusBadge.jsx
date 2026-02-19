const DeviceStatusBadge = ({ status = 'connected' }) => {
  const isConnected = status === 'connected';

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-2.5 py-1 text-xs font-bold font-['Manrope'] ${
        isConnected ? 'bg-emerald-50 text-teal-600' : 'bg-pink-100 text-red-800'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {isConnected ? 'Conectado' : 'Desconectado'}
    </span>
  );
};

export default DeviceStatusBadge;
