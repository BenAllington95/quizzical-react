import React, { useState, useEffect } from 'react';

export default function Start(props) {

    

    return (
        <div className="start">
            <h1 className="start-heading">Quizzical</h1>
            <p className="start-description">Test your knowledge and challenge yourself with our quiz app!</p>
            <button className="start-button" onClick={props.startQuiz}>
                Start Quiz
            </button>
        </div>
    )
}