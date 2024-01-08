import React, { useState } from 'react';

const OpenQuestion = ({ data, videoData, text, setText, handleExamData }) => {

    const handleTextChange = (event) => {
        setText(event.target.value);
        handleExamData();
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold mb-4">Pregunta final: {data.question}</div>
            <div className="text-xl font-semibold mb-4">Video: {videoData.title}</div>
            <div className="grid grid-cols-1 justify-items-center">
                <div className="mb-4">
                <iframe 
                    width="560" height="315" 
                    src={videoData.src} 
                    title="YouTube video player"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <div className="mb-4">
                    <input
                        className="w-full px-3 py-3 border rounded-lg shadow-md"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={handleTextChange}
                        placeholder="Respuesta"
                    />
                </div>
            </div>
        </div>
    );
}

export default OpenQuestion;
