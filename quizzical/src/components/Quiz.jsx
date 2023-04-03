import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'
import { nanoid } from 'nanoid'



export default function Quiz(props) {

        const [data, setData] = useState([]) // store the data from api
        const [quizzical, setQuizzical] = useState(false) // submit button to calculate when true
        const [score, setScore] = useState(0)
        const [isLoadingApi, SetIsLoadingApi] = useState(false)


        useEffect(() => {
            fetch(`https://opentdb.com/api.php?amount=${props.apiConditions.amountOfQuestions}&category=${props.apiConditions.category}&difficulty=${props.apiConditions.difficulty}`)
            .then(response => response.json())
                .then(data => refactorData(data.results))
        }, [0]) // fetch api for quiz questions, refactorData will create the object in way to manage certain states
       

        useEffect(() => {
            let timer;
            if (props.startQuiz) {
              timer = setTimeout(() => {
                SetIsLoadingApi(true)
            }, 500);
            }
            return () => clearTimeout(timer);
          }, [props.startQuiz]) // hook used to make the button and api data load at the same time

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
        } // customise the data to what needs to be placed into the components

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
        }, [quizzical]) // if quizzical is true it will check answers and return value of how many are correct in the score state

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
        } // checks if the user choices match the correct answer and if so increments the score state in app

    
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

            {isLoadingApi && <div className="questions">
                {quizElements}
            </div>}

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
            
            {isLoadingApi && !quizzical && <button 
            className="submit-button"
            onClick={()=> setQuizzical(true)}>
                Check
            </button>}

        </div>
    )
}