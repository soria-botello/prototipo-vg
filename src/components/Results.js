import React, { useState } from 'react';

const Results = ({ examData }) => {

    console.log(examData)

    const getTime = () => {
        // Calculate the time difference in milliseconds
        const timeDifference = examData.endTime - examData.startTime;

        // Convert the time difference to minutes
        const minutesDifference = Math.ceil(timeDifference / (1000 * 60));
        const hours = Math.floor(minutesDifference / 60);
        const remainingMinutes = minutesDifference % 60;

        if (hours > 0) {
            if (remainingMinutes > 0) {
                return `${hours} ${hours > 1 ? 'horas' : 'hora'} ${remainingMinutes} ${remainingMinutes > 1 ? 'minutos' : 'minuto'}`;
            } else {
                return `${hours} ${hours > 1 ? 'horas' : 'hora'}`;
            }
        } else {
            if (minutesDifference === 1) {
                return `${minutesDifference} minuto`;
            } else {
                return `${minutesDifference} minutos`;
            }
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="max-w-full overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">Nombre</th>
                        <td className="border px-4 py-2">{examData.name}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">Grupo</th>
                        <td className="border px-4 py-2">{examData.group}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">Pregunta</th>
                        <th className="border px-4 py-2 text-left">Respuesta</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(examData.answers).map(([question, answer]) => (
                        <tr key={question}>
                        <td className="border px-4 py-2">{examData.questions[question -1].id -1}: {examData.questions[question -1].question}</td>
                        <td className="border px-4 py-2">{answer}</td>
                        </tr>
                    ))}
                    <tr>
                        <th className="border px-4 py-2 text-left" colSpan="2">Pregunta final: {examData.questions[21].question}<br></br>Video: {examData.videoData.title}</th>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2" colSpan="2">{examData.openQuestion}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">Tiempo</th>
                        <td className="border px-4 py-2">{getTime()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
