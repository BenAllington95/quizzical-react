import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'



export default function Quiz() {


    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
          .then(response => response.json())
            .then(data => setData(data.results))
      
          
        }, []) // fetch api for quiz questions

        const quizElements = data.map((arr, index) => {
            return <Question 
            key={arr.question}
            answers={handleAnswers(index)}
            {...arr}
            />
          }) // Map over questions onto page
          
          
          
          console.log(data)
          
          function handleAnswers(index) {
            const correctAnswer = data[index].correct_answer
            const randomIndex = Math.floor(Math.random() * (data[index].incorrect_answers.length + 1))
            const allAnswers = [...data[index].incorrect_answers]
            allAnswers.splice(randomIndex, 0, correctAnswer)
          
            return allAnswers
          } // handles all answers, randomly pushes the correct answer into the incorrect answers array

    return (
        <div className="quiz">

        <img className="blue-blob" src={blueBlob} />
        <img className="yellow-blob" src={yellowBlob} />

            <div className="questions">
                {quizElements}
            </div>
            
            <button 
            className="submit-button"
            onClick={()=> console.log("submit button")}>
            Check
            </button>

        </div>
    )
}