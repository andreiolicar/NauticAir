const SettingsSelect = ({ id, label, value, onChange, options, error, helperText }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium font-['Manrope'] leading-tight">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-lg bg-white px-3.5 py-2.5 text-base font-normal font-['Manrope'] text-gray-900 outline outline-1 outline-offset-[-1px] ${
          error ? 'outline-red-500' : 'outline-gray-300'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helperText && !error && (
        <p className="text-gray-600 text-xs font-normal font-['Manrope'] leading-tight">{helperText}</p>
      )}
      {error && <p className="text-red-500 text-xs font-normal font-['Manrope'] leading-tight">{error}</p>}
    </div>
  );
};

export default SettingsSelect;
