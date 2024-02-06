import React, { useState } from 'react';

const Stars = ({ examData }) => {

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

    const getPoints = () => {
        
        let points = 0;

        for (const [questionId, answer] of Object.entries(examData.answers)) {
            points += getAnswer(questionId, answer);
        }

        return points
    }

    const getStars = (points) => {
        // Determine the star rating based on the total points
        if (points < 10) {
            return 0; // 0 stars
        } else if (points >= 10 && points < 14) {
            return 1; // 1 star
        } else if (points >= 14 && points < 18) {
            return 2; // 2 stars
        } else {
            return 3; // 3 stars
        }
    }

    const getAnswer = (questionId, answer) => {
        const question = examData.questions.find((q) => q.id === parseInt(questionId));

        console.log(question)

        if (question.answer === answer) {
            return 1;
        } else if (question.answer === true && answer == 1) {
            return 1;
        } else if (question.answer === false && answer == 2) {
            return 1;
        } else {
            return 0;
        }
    }

    let points = getPoints()
    let stars = getStars(points)

    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Hola { examData.name } del grupo { examData.group } </h2>
            <h2 className="text-2xl font-bold mb-4 text-center">Obtuviste { points } puntos!!!</h2>
            <div className="grid grid-cols-3 gap-4 justify-center items-center">
                <img
                    src="../assets/2B50_color.png"
                    className={`w-64 mx-auto ${stars >= 1 ? "grayscale-0" : "grayscale"}`}
                    alt="Star"
                />
                <img
                    src="../assets/2B50_color.png"
                    className={`w-64 mx-auto ${stars >= 2 ? "grayscale-0" : "grayscale"}`}
                    alt="Star"
                />
                <img
                    src="../assets/2B50_color.png"
                    className={`w-64 mx-auto ${stars === 3 ? "grayscale-0" : "grayscale"}`}
                    alt="Star"
                />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Y en la pregunta final, tu respuesta fue:</h2>
            <h2 className="text-2xl font-bold mb-4 text-center">{examData.openQuestion}</h2>
        </div>
    );
}

export default Stars;
