const SettingsSwitch = ({ id, label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3">
      <div>
        <p id={`${id}-label`} className="text-sm font-semibold font-['Manrope'] text-slate-900">
          {label}
        </p>
        {description && <p className="text-xs font-medium font-['Manrope'] text-slate-500">{description}</p>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsSwitch;
