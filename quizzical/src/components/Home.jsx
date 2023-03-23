import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';

export default function Home(props) {

    

    return (
        <div className="quiz">

        <img className="blue-blob" src={blueBlob} />
        <img className="yellow-blob" src={yellowBlob} />

            <div className="start-items">    
                <h1 className="start-title">Quizzical</h1>
                <p className="start-description">Test your knowledge and challenge yourself with our quiz app!</p>
                <button className="start-button" onClick={props.startQuiz}>
                    Start Quiz
                </button>
            </div>
        </div>
    )
}