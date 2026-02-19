const AlertDetailsSection = ({ title, children }) => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4" aria-label={title}>
      <h3 className="mb-3 text-sm font-semibold font-['Manrope'] text-gray-900">{title}</h3>
      <div>{children}</div>
    </section>
  );
};

export default AlertDetailsSection;
