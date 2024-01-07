import React from 'react';
import { Link } from 'react-router-dom';
import unitsData from  './data/unitsData.json'

const Units = () => {
  const units = unitsData

  return (
    <div className="h-screen my-10">
      <div className="flex justify-center items-center">
        <p className="text-xl font-semibold w-[800px] m-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus cursus aliquam odio, vitae sollicitudin est hendrerit condimentum. Vivamus sodales ultricies accumsan. Phasellus cursus mattis malesuada.
        </p>
      </div>
      <div className="flex justify-center items-center my-10">
        {units.map((unit, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg w-64 m-4">
            <Link className="text-xl font-semibold" to={"/unidad/" + unit.id}>
              <img src={"./assets/" + unit.image} alt={`Image ${index + 1}`} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                    <h2>{unit.title}</h2>
                <p className="text-gray-600">{unit.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Units;