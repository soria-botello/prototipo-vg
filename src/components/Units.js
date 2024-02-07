import React from 'react';
import { Link } from 'react-router-dom';
import unitsData from  './data/unitsData.json'

const Units = () => {
  const units = unitsData

  return (
    <div className="h-screen py-10 bg-slate-100">
      <div className="flex justify-center items-center">
        <p className="text-xl font-semibold w-[800px] p-4">
        ¡Hola! Te invitamos a emprender este viaje lleno de sabiduría y emociones.
        Puedes empezar  seleccionando el universo que más te agrade. 
        </p>
      </div>
      <div className="flex justify-center items-center py-10">
        {units.map((unit, index) => (
          <div key={index} className="bg-slate-900 shadow-lg rounded-lg w-64 m-4">
            <Link className="text-xl font-semibold" to={"/universo/" + unit.id}>
              <img src={"./assets/" + unit.image} alt={`Image ${index + 1}`} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-slate-100">{unit.title}</h2>
                <p className="text-slate-100">{unit.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Units;