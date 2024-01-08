import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import unitData1 from  './data/unit1.json';
import unitData2 from  './data/unit2.json';
import unitData3 from  './data/unit3.json';
import videosData from  './data/videosData.json';
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

  const loadVideoData = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    return videosData[randomNumber];
  }

  const unitData = loadUnitData(unitId);
  
  const randomizeQuestions = (questions) => {
    if (!Array.isArray(questions) || questions.length < 3) {
      return questions;
    }
  
    // Copy the array to avoid mutating the original
    const shuffledQuestions = [...questions];
  
    // Save the first and last questions
    const firstQuestion = shuffledQuestions[0];
    const lastQuestion = shuffledQuestions[shuffledQuestions.length - 1];
  
    // Remove the first and last questions from the array
    shuffledQuestions.shift();
    shuffledQuestions.pop();
  
    // Shuffle the remaining elements
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
  
    // Re-insert the first and last questions at the beginning and end
    shuffledQuestions.unshift(firstQuestion);
    shuffledQuestions.push(lastQuestion);
  
    // Add consecutive ids
    for (let i = 0; i < shuffledQuestions.length; i++) {
      shuffledQuestions[i].id = i + 1;
    }
  
    return shuffledQuestions;
  };

  // Define the content for the slideshow
  const [slideshowContent, setSlideshowContent] = useState([]);

  // State to store selected answers
  const [examData, setExamData] = useState({
    name: "",
    group: "",
    questions: [],
    answers: {},
    openQuestion: "",
    videoData: {},
    startTime: "",
    endTime: ""
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  // State to store name and group
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [text, setText] = useState('');
  const [videoData, setVideoData] = useState({});
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMsg, setShowNotificationMsg] = useState('');
  const [showNotificationPath, setShowNotificationPath] = useState('');
  const [examIsComplete, setExamIsComplete] = useState(false);

  // Function to update exam data
  const handleExamData = () => {
    if (slideshowContent.length == 0){
      setSlideshowContent(randomizeQuestions(unitData.questions))
    }
    if (Object.keys(videoData).length === 0){
      setVideoData(loadVideoData());
    }
    setStartTime(startTime === '' ? new Date() : startTime);

    let examData = {
      name: name,
      group: group,
      questions: slideshowContent,
      answers: selectedAnswers,
      openQuestion: text,
      videoData: videoData,
      startTime: startTime,
      endTime: endTime
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
      setGroup("A")
      handleExamData();
    }
    return true;
  };

  // Validation function for the question
  const validateQuestion = () => {
    const questionId = examData.questions[currentSlide].id
    if (!examData.answers[questionId]) {
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
    // Set End Time
    setEndTime(endTime === '' ? new Date() : endTime);
    handleExamData();

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
    //const question = slideshowContent[currentSlide];
    if (examData.questions.length == 0 ) {
      handleExamData();
    } else {
      const question = examData.questions[currentSlide];
      console.log(examData);
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
              videoData={videoData}
              text={text}
              setText={handleLastQuestion}
              handleExamData={handleExamData}
            />;
        default:
          return null;
      }
    }
  }

  const loadResults = () => {
    if (examData.endTime == '') {
      // Set End Time
      setEndTime(endTime === '' ? new Date() : endTime);
      handleExamData();
    } else {
      return <Results 
        examData={examData}
      />;
    }
  }

  const handlePrintClick = () => {
    window.print();
  };

  const handleCloseWindow = () => {
    setShowNotificationMsg('¿Estás seguro de que quieres cerrar esta ventana?');
    setShowNotificationPath('/');
    setShowNotification(true);
  };

  const handleNextUnit = () => {
    setShowNotificationMsg('¿Estás seguro de que quieres ir a unidades?');
    setShowNotificationPath('/unidades');
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
    <div className="p-4 h-600">
      <h2 className="text-4xl font-bold mb-4">{unitData.name}: {unitData.description}</h2>

      {!examIsComplete && (
      <div className="bg-white p-4 shadow-md rounded-md h-[500px]">
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
        { unitId != 3 && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
          onClick={handleNextUnit}
        >
          Ir a Unidades
        </button>
        )}
        
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
            <p>{showNotificationMsg}
            <Link
              to={showNotificationPath}
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