import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="text-2xl text-gray-800">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="text-2xl text-gray-800">
          <i className="fas fa-circle"></i>
        </div>
        <div className="text-2xl text-gray-800">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center">
        <img src="./assets/greece.jpg" alt="Big Image" className="w-1/2" />
        <h1 className="text-4xl font-bold my-4">HumaniTeens</h1>
        <h5 className="text-1xl text-center text-gray-500">“La Digitalización Como Potencializador De Las Humanidades”</h5>
      </div>
      <div className="p-4 text-center">
        <Link to="/unidades" className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Iniciar
        </Link>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white text-center text-gray-500">
       Victoria Cepeda, Gabriela Soria 
      </div>
    </div>
  );
};

export default LandingPage;
