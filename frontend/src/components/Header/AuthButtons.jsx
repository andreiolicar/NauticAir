// src/components/Header/AuthButtons.jsx
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="rounded-lg flex justify-end items-center gap-2.5">
      <Link
        to="/registro"
        className="px-5 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-50 transition-colors"
      >
        <div className="self-stretch text-center justify-start text-grey-600 text-sm font-medium font-['Manrope']">
          Registro
        </div>
      </Link>
      
      <Link
        to="/login"
        className="w-24 px-5 py-2 bg-blue-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-blue-700 transition-colors"
      >
        <div className="self-stretch text-center justify-start text-white text-sm font-medium font-['Manrope']">
          Login
        </div>
      </Link>
    </div>
  );
};

export default AuthButtons;