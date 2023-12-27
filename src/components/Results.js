import React, { useState } from 'react';

const Results = ({ examData }) => {

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="max-w-full overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Grupo</th>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{examData.name}</td>
                        <td className="border px-4 py-2">{examData.group}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2">Pregunta</th>
                        <th className="border px-4 py-2">Respuesta</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(examData.answers).map(([question, answer]) => (
                        <tr key={question}>
                        <td className="border px-4 py-2">{question}</td>
                        <td className="border px-4 py-2">{answer}</td>
                        </tr>
                    ))}
                    <tr>
                        <th colSpan="2" className="border px-4 py-2">OpenQuestion</th>
                    </tr>
                    <tr>
                        <td colSpan="2" className="border px-4 py-2">{examData.openQuestion}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
