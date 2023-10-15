import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Unit = () => {
  const { unitId } = useParams();

  // Define the content for the slideshow
  const slideshowContent = ["Question 1", "Question 2", "Question 3"]; // Add more questions as needed

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle the "Siguiente" button click
  const handleNextClick = () => {
    // Increment the current slide index
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowContent.length);
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Big Title for Unit {unitId}</h2>

      <div className="bg-white p-4 shadow-md rounded-md">
        <p className="text-xl">{slideshowContent[currentSlide]}</p>
      </div>

      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleNextClick}>
        Siguiente
        </button>
      </div>
    </div>
  );
};

export default Unit;