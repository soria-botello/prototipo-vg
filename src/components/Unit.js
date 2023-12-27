import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import unitData1 from  './data/unit1.json';
import unitData2 from  './data/unit2.json';
import unitData3 from  './data/unit3.json';
import NameQuestion from './NameQuestion';
import TrueFalseTextQuestion from './TrueFalseTextQuestion';
import TrueFalseImageQuestion from './TrueFalseImageQuestion';
import OptionsTextQuestion from './OptionsTextQuestion';
import OptionsImageQuestion from './OptionsImageQuestion';
import OpenQuestion from './OpenQuestion';
import Results from './Results';

const Unit = () => {
  const { unitId } = useParams();

  const loadUnitData = (unitId) => {
    switch (unitId) {
      case '1':
        return unitData1;
      case '2':
        return unitData2;
      case '3':
        return unitData3;
      default:
        return unitData1;
    }
  }

  const unitData = loadUnitData(unitId);

  // Define the content for the slideshow
  const slideshowContent = unitData.questions;

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // State to store selected answers
  const [examData, setExamData] = useState({
    name: "",
    group: "",
    answers: {},
    openQuestion: ""
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  // State to store name and group
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [examIsComplete, setExamIsComplete] = useState(false);

  // Function to update exam data
  const handleExamData = () => {
    let examData = {
      name: name,
      group: group,
      answers: selectedAnswers,
      openQuestion: text
    }
    setExamData(examData);
  };

  // Function to handle the option selection
  const handleAnswerSelect = (optionId) => {
    const question = slideshowContent[currentSlide];
    selectedAnswers[question.id] = optionId
    setSelectedAnswer(optionId)
  };

  const handleLastQuestion = (value) => {
    setText(value);
    handleExamData();
  };

  // Validation function for the Name field
  const validateNameField = () => {
    if (examData.name.trim() === '') {
      return false;
    }
    return true;
  };

  // Validation function for the Group field
  const validateGroupField = () => {
    if (examData.group.trim() === '') {
      return false;
    }
    return true;
  };

  // Validation function for the question
  const validateQuestion = () => {
    if (!examData.answers[currentSlide]) {
      return false;
    }
    return true;
  };

  // Validation function for the Text field
  const validateTextField = () => {
    if (examData.openQuestion.trim() === '') {
      return false;
    }
    return true;
  };

  // Function to handle the "Siguiente" button click
  const handleNextClick = () => {
    handleExamData()

    if (currentSlide == 0) {
      if (!validateNameField() || !validateGroupField()) {
        setError('Escribe tu nombre y grupo');
        return;
      }
    } else {
      if (!validateQuestion()) {
        setError('Selecciona una opcion');
        return;
      }
    }

    // Increment the current slide index
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowContent.length);
    setSelectedAnswer(0)
  };

  // Function to handle the "Finalizar" button click
  const handleFinishClick = () => {
    handleExamData()

    if (currentSlide == 21) {
      if (!validateTextField()) {
        setError('Escribe tu respuesta');
        return;
      }
    }

    setExamIsComplete(true)
  };

  const closeErrorPopup = () => {
    setError(null);
  };

  const loadQuestion = () => {
    const question = slideshowContent[currentSlide];

    switch (question.type) {
      case 'name-question':
        return <NameQuestion 
          data={question}
          name={name}
          group={group}
          setName={setName}
          setGroup={setGroup}
          handleExamData={handleExamData}
        />;
      case 'true-false-text':
        return <TrueFalseTextQuestion 
          data={question}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />;
      case 'true-false-image':
        return <TrueFalseImageQuestion 
          data={question} 
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />;
      case 'options-text':
        return <OptionsTextQuestion
          data={question}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />;
      case 'options-image':
        return <OptionsImageQuestion 
          data={question}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />;
        case 'open-question':
          return <OpenQuestion 
            data={question}
            text={text}
            setText={handleLastQuestion}
          />;
      default:
        return null;
    }
  }

  const loadResults = () => {
    return <Results 
      examData={examData}
    />;
  }

  const handlePrintClick = () => {
    window.print();
  };

  const handleCloseWindow = () => {
    setShowNotification(true);
  };

  const handleConfirmClose = (confirmed) => {
    if (confirmed) {
      this.props.history.push("/");
    }
    setShowNotification(false);
  };

  // Check if the current slide is the last slide
  const isLastSlide = currentSlide === slideshowContent.length - 1;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">{unitData.name}: {unitData.description}</h2>

      {!examIsComplete && (
      <div className="bg-white p-4 shadow-md rounded-md">
        <div>{loadQuestion()}</div>
      </div>
      )}

      <div className="mt-4">
        {!isLastSlide && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={handleNextClick}
          >
            Siguiente
          </button>
        )}
        {isLastSlide && !examIsComplete && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={handleFinishClick}
          >
            Finalizar
          </button>
        )}
      </div>

      {examIsComplete && (
      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Resultado</h2>
        <div>{loadResults()}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
          onClick={handlePrintClick}
        >
          Imprimir
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={handleCloseWindow}
        >
          Cerrar
        </button>
      </div>
      )}

      {error && (
        <div role="alert" class="fixed top-0 left-1/2 transform -translate-x-1/2 my-2">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Error
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{error}
              <button
                className="ml-4 bg-blue-500 left-0 text-white px-4 py-2 rounded-full"
                onClick={closeErrorPopup}
              >
                OK
              </button>
            </p>
          </div>
        </div>
      )}

      {showNotification && (
        <div role="alert" class="fixed top-0 left-1/2 transform -translate-x-1/2 my-2">
          <div class="bg-yellow-500 text-white font-bold rounded-t px-4 py-2">
            Advertencia
          </div>
          <div class="border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700">
            <p>¿Estás seguro de que quieres cerrar esta ventana?
            <Link
              to="/"
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Si
            </Link>
            <button
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={() => handleConfirmClose(false)}
            >
              No
            </button>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Unit;