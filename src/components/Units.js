import React from 'react';
import { Link } from 'react-router-dom';
import unitsData from  './data/unitsData.json'


const Units = () => {
  const units = unitsData

  return (
    <div className="flex justify-center items-center h-screen">
      {units.map((unit, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg w-64 m-4">
          <img src={"./assets/" + unit.image} alt={`Image ${index + 1}`} className="w-full h-40 object-cover rounded-t-lg" />
          <div className="p-4">
            <Link className="text-xl font-semibold" to={"/unidad/" + unit.id}>
                 <h2>{unit.title}</h2>
            </Link>
            <p className="text-gray-600">{unit.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Units;