import React, { useState } from 'react';

const TrueFalseTextQuestion = ({ data, onAnswerSelect, selectedAnswer }) => {

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold mb-4">{data.id -1}: {data.question}</div>
            <div className="grid grid-cols-2 gap-4">
                {data.options.map((option, index) => (
                    <div
                        key={index}
                        className={`${
                        option.id === selectedAnswer ? 'bg-green-500' : 'bg-blue-500'
                        } p-4 text-white rounded-lg shadow-md flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105`}
                        onClick={() => onAnswerSelect(option.id)}
                    >
                    <span className="text-lg mb-2">{option.option}</span>
                </div>
                ))}
            </div>
        </div>
    );
}

export default TrueFalseTextQuestion;
