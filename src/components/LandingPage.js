import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between relative"> {/* Updated to relative positioning */}
      {/* Header */}
      <div className="flex items-center justify-between bg-white">
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
      <div className="flex flex-col items-center justify-center h-screen relative"> {/* Updated to relative positioning */}
        <img src="./assets/greece.jpg" alt="Big Image" className="w-full h-full object-cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"> {/* Absolute positioning for centering */}
          <h1 className="text-4xl text-slate-100 font-bold my-4">HumaniTeens</h1>
          <h5 className="text-1xl text-slate-100 font-bold">“La Digitalización Como Potencializador De Las Humanidades”</h5>
          <div className="p-4 text-center relative"> {/* Updated to relative positioning */}
            <Link to="/universos" className="bg-violet-600 text-white px-6 py-2  rounded-full">Iniciar</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center text-slate-100">
        Victoria Cepeda, Gabriela Soria
      </div>
    </div>
  );
};

export default LandingPage;
