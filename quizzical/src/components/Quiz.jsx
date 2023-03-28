import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'
import { nanoid } from 'nanoid'



export default function Quiz(props) {

        const [data, setData] = useState([]) // store the data from api
        const [quizzical, setQuizzical] = useState(false) // submit button to calculate when true

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
              isRight: false,
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
                console.log(countIsHeld(data))
                
            } else {

            }
        }, [quizzical])

        function countIsHeld(arr) {
            const count = arr.filter(obj => obj.isHeld).length;

            return count
        }

    

    
        const quizElements = data.map((arr, index) => {
            return <Question 
            key={arr.question}
            answers={arr.answers}
            holdAnswer={holdAnswer}
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

            {quizzical && <p>Answers Correct: 0/{data.length}</p>}
            
            <button 
            className="submit-button"
            onClick={()=> setQuizzical(true)}>
            Check
            </button>

        </div>
    )
}