import { motion } from 'framer-motion';

const SettingsSectionCard = ({ title, description, icon: Icon, children }) => {
  return (
    <motion.section
      className="rounded-lg border border-zinc-100 bg-white p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      aria-labelledby={`settings-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <header className="mb-4 inline-flex w-full items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-700">
          <Icon size={16} />
        </span>
        <div>
          <h2
            id={`settings-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-base font-bold font-['Manrope'] text-slate-900"
          >
            {title}
          </h2>
          <p className="mt-0.5 text-sm font-medium font-['Manrope'] text-slate-500">{description}</p>
        </div>
      </header>

      {children}
    </motion.section>
  );
};

export default SettingsSectionCard;
