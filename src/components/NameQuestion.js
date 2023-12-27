import React, { useState } from 'react';

const NameQuestion = ({ data, name, setName, group, setGroup, handleExamData }) => {

    const handleNameChange = (event) => {
        setName(event.target.value);
        handleExamData()
    };
    
    const handleGroupChange = (event) => {
        setGroup(event.target.value);
        handleExamData()
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-semibold mb-4">{data.question}</div>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-2">Escribe tu nombre completo</label>
                    <input
                    className="w-full px-3 py-2 border rounded-lg shadow-md"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameChange}
                    placeholder="Nombre Completo"
                    />
                </div>
                <div>
                    <label className="block mb-2">Escribe tu grupo</label>
                    <input
                    className="w-full px-3 py-2 border rounded-lg shadow-md"
                    type="text"
                    value={group}
                    onChange={handleGroupChange}
                    onBlur={handleGroupChange}
                    placeholder="Grupo"
                    />
                </div>
            </div>
        </div>
    );
}

export default NameQuestion;
