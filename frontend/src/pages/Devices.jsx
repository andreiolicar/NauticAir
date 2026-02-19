import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import DevicesPageHeader from '../components/Devices/DevicesPageHeader';
import DevicesGrid from '../components/Devices/DevicesGrid';
import DeviceCreateModal from '../components/Devices/DeviceCreateModal';
import DeviceDetailsDrawer from '../components/Devices/DeviceDetailsDrawer';
import { fadeIn } from '../utils/animations';
import { fetchDeviceDetailsById, mapDeviceToDetails } from '../utils/devices';

const initialForm = {
  name: '',
  info1: '',
  info2: '',
  info3: '',
  description: ''
};

const Devices = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDeviceDetails, setActiveDeviceDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const [devices, setDevices] = useState([
    {
      id: 'ID 0001',
      status: 'connected',
      image: 'https://placehold.co/72x72',
      schedule: 'Segunda a Sexta',
      hours: 'Das 8 as 17',
      cost: 'R$200,00',
      info1: 'Operacao padrao',
      info2: 'CO2e Monitor',
      info3: 'Acuracia 98%',
      description: 'Sensor principal de emissao para operacao em rota internacional.',
      createdAt: '2025-10-03T10:15:30.000Z'
    },
    {
      id: 'ID 0002',
      status: 'disconnected',
      image: 'https://placehold.co/72x72',
      schedule: 'Segunda a Sexta',
      hours: 'Das 8 as 17',
      cost: 'R$200,00',
      info1: '',
      info2: '',
      info3: '',
      description: '',
      createdAt: '2025-10-05T09:10:00.000Z'
    }
  ]);

  const devicesById = useMemo(() => {
    return new Map(devices.map((device) => [device.id, device]));
  }, [devices]);

  const selectedDevice = deviceId ? devicesById.get(deviceId) : null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = () => {};

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Informe o nome do dispositivo.';
    if (!formData.info1.trim()) nextErrors.info1 = 'Campo obrigatorio.';
    if (!formData.info2.trim()) nextErrors.info2 = 'Campo obrigatorio.';
    if (!formData.info3.trim()) nextErrors.info3 = 'Campo obrigatorio.';
    return nextErrors;
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));

      const nextId = `ID ${String(devices.length + 1).padStart(4, '0')}`;
      setDevices((prev) => [
        {
          id: nextId,
          status: 'connected',
          image: 'https://placehold.co/72x72',
          schedule: formData.info1,
          hours: formData.info2,
          cost: formData.info3,
          info1: formData.info1,
          info2: formData.info2,
          info3: formData.info3,
          description: formData.description || `Dispositivo ${formData.name}`,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);

      setIsCreateOpen(false);
      setFormData(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadDetails = async () => {
      if (!deviceId) {
        setActiveDeviceDetails(null);
        setDetailsError(null);
        setIsDetailsLoading(false);
        return;
      }

      if (!selectedDevice) {
        setActiveDeviceDetails(null);
        setDetailsError('Dispositivo nao encontrado.');
        setIsDetailsLoading(false);
        return;
      }

      const mappedBase = mapDeviceToDetails(selectedDevice);
      setDetailsError(null);
      setActiveDeviceDetails(mappedBase);

      const hasFullDetails = Boolean(selectedDevice.info1 && selectedDevice.info2 && selectedDevice.info3);
      if (hasFullDetails) {
        setIsDetailsLoading(false);
        return;
      }

      setIsDetailsLoading(true);
      try {
        const payload = await fetchDeviceDetailsById(deviceId);
        if (isCancelled) return;

        const merged = {
          ...selectedDevice,
          ...payload.data
        };
        setActiveDeviceDetails(mapDeviceToDetails(merged));
      } catch (error) {
        if (isCancelled) return;
        setDetailsError(error.message || 'Falha ao carregar detalhes do dispositivo.');
      } finally {
        if (!isCancelled) setIsDetailsLoading(false);
      }
    };

    loadDetails();
    return () => {
      isCancelled = true;
    };
  }, [deviceId, selectedDevice]);

  const handleRetryDetails = async () => {
    if (!deviceId) return;
    setDetailsError(null);
    setIsDetailsLoading(true);

    try {
      const payload = await fetchDeviceDetailsById(deviceId);
      const base = selectedDevice || { id: deviceId, status: 'connected', image: 'https://placehold.co/72x72' };
      setActiveDeviceDetails(mapDeviceToDetails({ ...base, ...payload.data }));
    } catch (error) {
      setDetailsError(error.message || 'Falha ao carregar detalhes do dispositivo.');
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleOpenDetails = (id) => {
    navigate(`/dashboard/devices/${encodeURIComponent(id)}`);
  };

  const handleCloseDetails = () => {
    navigate('/dashboard/devices');
  };

  return (
    <>
      <DevicesPageHeader onCreate={() => setIsCreateOpen(true)} />

      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mt-4"
      >
        <DevicesGrid devices={devices} onOpenDetails={handleOpenDetails} />
      </motion.section>

      <DeviceCreateModal
        isOpen={isCreateOpen}
        formData={formData}
        errors={errors}
        loading={isSubmitting}
        onChange={handleInputChange}
        onImageChange={handleImageChange}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <DeviceDetailsDrawer
        isOpen={Boolean(deviceId)}
        deviceId={deviceId}
        deviceData={activeDeviceDetails}
        isLoading={isDetailsLoading}
        error={detailsError}
        onClose={handleCloseDetails}
        onRetry={handleRetryDetails}
      />
    </>
  );
};

export default Devices;
