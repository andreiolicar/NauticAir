// src/components/common/SectionTitle.jsx
const SectionTitle = ({ 
  title, 
  textSize = "text-4xl", 
  fontWeight = "font-bold",
  textColor = "text-neutral-800",
  leading = "leading-9"
}) => {
  return (
    <h2 className={`text-center justify-start ${textColor} ${textSize} ${fontWeight} font-['Manrope'] ${leading}`}>
      {title.split('<br />').map((line, index) => (
        <span key={index}>
          {line}
          {index < title.split('<br />').length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
};

export default SectionTitle;