import React from 'react'

export default function Start({ toggleQuiz }) {
    return (
        <div id="start">
            <h2>Quizzical</h2>
            <p className="s-description">Some description if needed</p>
            <button className="s-button" onClick={toggleQuiz}>Start quiz</button>
        </div>
    )
}