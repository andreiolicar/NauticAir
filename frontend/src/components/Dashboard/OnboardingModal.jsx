import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Bem vindo ao seu dashboard!',
    description: 'Aqui voce ira acompanhar as principais informacoes referentes aos seus IOTs e suas emissoes!'
  },
  {
    id: 2,
    title: 'Bem vindo ao seu dashboard!',
    description: 'Aqui voce ira acompanhar as principais informacoes referentes aos seus IOTs e suas emissoes!'
  },
  {
    id: 3,
    title: 'Bem vindo ao seu dashboard!',
    description: 'Aqui voce ira acompanhar as principais informacoes referentes aos seus IOTs e suas emissoes!'
  }
];

const stepTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } }
};

const previewCardTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const DeviceStatusBadge = ({ status }) => {
  const isConnected = status === 'Conectado';

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-2.5 py-1 text-xs font-bold font-['Manrope'] ${
        isConnected ? 'bg-emerald-50 text-teal-600' : 'bg-pink-100 text-red-800'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
};

const AlertPreviewItem = ({ variant, text, time, barClass }) => {
  const visual = {
    success: {
      icon: CircleCheck,
      iconWrap: 'bg-emerald-50 text-teal-600',
      bar: 'bg-teal-600'
    },
    warning: {
      icon: CircleAlert,
      iconWrap: 'bg-yellow-50 text-yellow-500',
      bar: 'bg-yellow-500'
    },
    critical: {
      icon: CircleX,
      iconWrap: 'bg-pink-100 text-red-800',
      bar: 'bg-red-800'
    }
  }[variant];

  const Icon = visual.icon;

  return (
    <motion.li
      variants={previewCardTransition}
      className="inline-flex w-80 items-center gap-3 rounded-lg border border-gray-200 bg-white p-2.5"
    >
      <span className={`rounded-[999px] p-2.5 ${visual.iconWrap}`}>
        <Icon size={20} />
      </span>

      <div className="flex-1 space-y-2">
        <div className="inline-flex w-full items-start justify-between">
          <p className="text-sm font-medium font-['Manrope'] leading-5 text-slate-900">{text}</p>
          <p className="text-sm font-semibold font-['Manrope'] leading-5 text-slate-500">{time}</p>
        </div>

        <div className="rounded-[999px] bg-zinc-100">
          <div className={`h-2 rounded-[99px] ${visual.bar} ${barClass}`} />
        </div>
      </div>
    </motion.li>
  );
};

const PreviewOne = () => {
  return (
    <motion.div
      key="preview-1"
      {...stepTransition}
      className="relative h-52 w-full overflow-hidden rounded-lg bg-neutral-100"
    >
      <motion.article
        variants={previewCardTransition}
        initial="initial"
        animate="animate"
        className="absolute left-[116px] top-[20px] flex h-24 w-52 flex-col gap-3.5 rounded-lg border border-gray-200 bg-white p-3.5 shadow-[0px_0.6532257795333862px_1.3064515590667725px_0px_rgba(10,13,18,0.05)]"
      >
        <h3 className="text-sm font-semibold font-['Manrope'] leading-4 text-gray-900">Emissao CO2e (g/h)</h3>

        <div className="inline-flex items-end gap-2.5">
          <div className="flex-1 space-y-2">
            <p className="text-xl font-semibold font-['Inter'] leading-6 text-gray-900">321g/h</p>
            <div className="inline-flex items-center gap-1.5">
              <div className="inline-flex items-center gap-[1.31px]">
                <span className="h-2.5 w-2.5 rounded-full border border-red-500" />
                <span className="text-[9.15px] font-medium font-['Inter'] leading-3 text-red-700">10%</span>
              </div>
              <span className="line-clamp-1 text-[9.15px] font-medium font-['Inter'] leading-3 text-gray-600">vs last month</span>
            </div>
          </div>

          <div className="relative h-9 w-20 rounded-sm border border-red-500 bg-red-500/10">
            <div className="absolute left-[40px] top-[9px] h-3 w-3 rounded-full border border-red-500/30">
              <div className="absolute left-[2.8px] top-[2.8px] h-1.5 w-1.5 rounded-full border border-red-500 bg-white" />
            </div>
          </div>
        </div>
      </motion.article>

      <motion.article
        variants={previewCardTransition}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.08, duration: 0.3 }}
        className="absolute left-[20px] top-[86px] flex h-24 w-52 flex-col gap-3.5 rounded-lg border border-gray-200 bg-white p-3.5 shadow-[0px_0.653225839138031px_1.306451678276062px_0px_rgba(10,13,18,0.05)]"
      >
        <h3 className="text-xs font-semibold font-['Inter'] leading-4 text-gray-900">Creditos de Carbono</h3>

        <div className="inline-flex items-end gap-2.5">
          <div className="flex-1 space-y-2">
            <p className="text-xl font-semibold font-['Inter'] leading-6 text-gray-900">1.0016</p>
            <div className="inline-flex items-center gap-1.5">
              <div className="inline-flex items-center gap-[1.31px]">
                <span className="h-2.5 w-2.5 rounded-full border border-emerald-500" />
                <span className="text-[9.15px] font-medium font-['Inter'] leading-3 text-emerald-700">40%</span>
              </div>
              <span className="line-clamp-1 text-[9.15px] font-medium font-['Inter'] leading-3 text-gray-600">ao mes anterior</span>
            </div>
          </div>

          <div className="relative h-9 w-20 rounded-sm border border-emerald-500 bg-emerald-500/10">
            <div className="absolute left-[42px] top-[2px] h-3 w-3 rounded-full border border-emerald-500/30">
              <div className="absolute left-[2.8px] top-[2.8px] h-1.5 w-1.5 rounded-full border border-emerald-500 bg-white" />
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

const PreviewTwo = () => {
  return (
    <motion.div
      key="preview-2"
      {...stepTransition}
      className="relative h-52 w-full overflow-hidden rounded-lg bg-neutral-100"
    >
      <motion.ul className="relative h-full">
        <motion.li
          variants={previewCardTransition}
          initial="initial"
          animate="animate"
          className="absolute left-[19px] top-[26px] inline-flex w-80 items-center justify-between rounded-lg border border-gray-200 bg-white p-2.5"
        >
          <div className="inline-flex items-center gap-3">
            <img src="https://placehold.co/56x56" alt="Dispositivo ID 0001" className="h-14 w-14 rounded-full" />
            <div className="inline-flex flex-col">
              <p className="text-sm font-medium font-['Manrope'] leading-5 text-slate-900">ID 0001</p>
              <p className="text-sm font-medium font-['Manrope'] leading-5 text-gray-400">Dispositivo</p>
            </div>
          </div>
          <DeviceStatusBadge status="Conectado" />
        </motion.li>

        <motion.li
          variants={previewCardTransition}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.08, duration: 0.3 }}
          className="absolute left-[19px] top-[106px] inline-flex w-80 items-center justify-between rounded-lg border border-gray-200 bg-white p-2.5"
        >
          <div className="inline-flex items-center gap-3">
            <img src="https://placehold.co/56x56" alt="Dispositivo ID 0002" className="h-14 w-14 rounded-full" />
            <div className="inline-flex flex-col">
              <p className="text-sm font-medium font-['Manrope'] leading-5 text-slate-900">ID 0002</p>
              <p className="text-sm font-medium font-['Manrope'] leading-5 text-gray-400">Dispositivo</p>
            </div>
          </div>
          <DeviceStatusBadge status="Desconectado" />
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

const PreviewThree = () => {
  return (
    <motion.div
      key="preview-3"
      {...stepTransition}
      className="flex h-52 w-full flex-col justify-center gap-2.5 overflow-hidden rounded-lg bg-neutral-100 py-[5px]"
    >
      <motion.ul
        initial="initial"
        animate="animate"
        className="flex flex-col items-center gap-2.5"
      >
        <AlertPreviewItem variant="success" text="Sua emissao de CO esta..." time="2 Dias" barClass="w-16" />
        <AlertPreviewItem variant="warning" text="Emissao em alerta!" time="7 Dias" barClass="w-32" />
        <AlertPreviewItem variant="critical" text="Saldo negativo!" time="2 Semanas" barClass="w-56" />
      </motion.ul>
    </motion.div>
  );
};

const OnboardingPreview = ({ step }) => {
  return (
    <AnimatePresence mode="wait">
      {step === 0 && <PreviewOne />}
      {step === 1 && <PreviewTwo />}
      {step === 2 && <PreviewThree />}
    </AnimatePresence>
  );
};

const OnboardingModal = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onComplete?.();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onComplete]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const activeStep = useMemo(() => steps[currentStep], [currentStep]);

  const handleNext = () => {
    if (currentStep >= steps.length - 1) {
      onComplete?.();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={!isOpen}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            className="w-96 overflow-hidden rounded-2xl bg-white shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.04)] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.10)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pt-6">
              <OnboardingPreview step={currentStep} />
            </div>

            <div className="px-6 pt-6 text-center">
              <h2 id="onboarding-title" className="text-lg font-semibold font-['Inter'] leading-7 text-gray-900">
                {activeStep.title}
              </h2>
              <p className="mt-1 text-sm font-normal font-['Inter'] leading-5 text-gray-600">
                {activeStep.description}
              </p>
            </div>

            <ol className="inline-flex w-full justify-center gap-4 pt-5" aria-label="Progresso do onboarding">
              {steps.map((step, index) => {
                const isActive = index === currentStep;

                return (
                  <motion.li
                    key={step.id}
                    className={`h-2.5 w-2.5 rounded-md ${isActive ? 'bg-blue-600' : 'bg-neutral-100'}`}
                    animate={{ scale: isActive ? 1.15 : 1, opacity: isActive ? 1 : 0.75 }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </ol>

            <footer className="px-6 pb-6 pt-8">
              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-base font-semibold font-['Inter'] text-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors hover:bg-blue-700"
              >
                {currentStep === steps.length - 1 ? 'Concluir' : 'Prosseguir'}
              </button>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
