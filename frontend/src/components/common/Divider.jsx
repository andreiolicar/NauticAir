// src/components/common/Divider.jsx
const Divider = ({ maxWidth = "max-w-[1440px]" }) => {
  return (
    <div className={`w-full h-px ${maxWidth} relative border border-gray-200`} />
  );
};

export default Divider;