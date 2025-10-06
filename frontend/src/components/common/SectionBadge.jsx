// src/components/common/SectionBadge.jsx
import { Mail, WindArrowDown, FileText, MessageCircle } from 'lucide-react';

const iconMap = {
  Mail,
  WindArrowDown,
  FileText,
  MessageCircle
};

const SectionBadge = ({ 
  icon = "Mail", 
  text, 
  bgColor = "bg-gray-200", 
  outlineColor = "outline-gray-200" 
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div className={`px-3.5 py-2.5 ${bgColor} rounded-[100px] outline outline-1 outline-offset-[-1px] ${outlineColor} inline-flex justify-center items-center gap-2.5 overflow-hidden`}>
      <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
        <IconComponent className="w-4 h-4 text-grey-600" />
      </div>
      <div className="justify-start text-grey-600 text-sm font-normal font-['Manrope']">
        {text}
      </div>
    </div>
  );
};

export default SectionBadge;