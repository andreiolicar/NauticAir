// src/components/Hero/HeroDescription.jsx

const HeroDescription = () => {
  return (
    <p className="text-center px-4 md:px-0 max-w-[90%] md:max-w-none">
      <span className="text-grey-600 text-base md:text-xl font-medium font-['Manrope'] leading-relaxed md:leading-7">
        Sistema completo que, com o auxílio de um dispositivo dedicado,<br className="hidden md:block" />
        entrega dados em tempo real sobre as emissões de carbono  -<br className="hidden md:block" />
      </span>
      <span className="text-black text-base md:text-xl font-medium font-['Manrope'] leading-relaxed md:leading-7">
        Tudo em tempo real, com a possibilidade de obter Créditos de Carbono.
      </span>
    </p>
  );
};

export default HeroDescription;