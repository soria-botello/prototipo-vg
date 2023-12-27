import React, { useState } from 'react';

const OpenQuestion = ({ data, text, setText }) => {

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold mb-4">{data.question}</div>
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
