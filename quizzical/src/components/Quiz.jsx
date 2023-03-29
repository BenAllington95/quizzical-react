import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'
import { nanoid } from 'nanoid'



export default function Quiz(props) {

        const [data, setData] = useState([]) // store the data from api
        const [quizzical, setQuizzical] = useState(false) // submit button to calculate when true
        const [score, setScore] = useState(0)


        useEffect(() => {
            fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
                .then(data => refactorData(data.results))
        }, [0]) // fetch api for quiz questions, refactorData will create the object in way to manage certain states
       
    
        function refactorData(api) {
    
          setData(prevData => api.map(item => {
            const correctAnswer = item.correct_answer
            const randomIndex = Math.floor(Math.random() * (item.incorrect_answers.length + 1))
            const allAnswers = [...item.incorrect_answers]
            allAnswers.splice(randomIndex, 0, correctAnswer)
    
            // randomly pushes the correct answer inside of incorrect answers (now defined as allAnswers)
    
            return {
              id: nanoid(),
              question: item.question,
              answers: allAnswers,
              correctAnswer: correctAnswer,
              userAnswer: "",
              isHeld: false
            }
          }))
        }

        function holdAnswer(id, answer) {
            setData(prevData => prevData.map(item => {
                if (item.id === id) {
                    return { ...item, isHeld: true, userAnswer: answer};
                } else {
                    return item;
                }
            }))
        }

        useEffect(() => {
            if (quizzical) {
                checkAnswers(data)
            } else {
                setScore(0)
            }
        }, [quizzical])

        function summaryMessage() {
            let message
                if (score < 3) {
                    return `You scored ${score}/${data.length}, Try Again!`
                } else {
                    return `You scored ${score}/${data.length}, Nice work!`
                } 
        }


        function checkAnswers(arr) {
            for (let i=0; i<arr.length; i++) {
                if (arr[i].correctAnswer === arr[i].userAnswer) {
                    setScore(prevCount => prevCount + 1)
                }
            }
        }

    
        const quizElements = data.map((arr, index) => {
            return <Question 
            key={arr.question}
            answers={arr.answers}
            holdAnswer={holdAnswer}
            quizzical={quizzical}
            {...arr}
            />
          }) // Map over questions onto page

    return (
        <div className="quiz">

        <img className="blue-blob" src={blueBlob} />
        <img className="yellow-blob" src={yellowBlob} />

            <div className="questions">
                {quizElements}
            </div>

            {quizzical && 
            <div className="summary-section">
                <p
                className="answer-summary-text">
                    {summaryMessage()}
                </p>
                <button
                onClick={props.resetQuiz}
                className="submit-button">
                    Play Again
                </button>
            </div>}
            
            {!quizzical && <button 
            className="submit-button"
            onClick={()=> setQuizzical(true)}>
                Check
            </button>}

        </div>
    )
}