import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'
import { nanoid } from 'nanoid'



export default function Quiz(props) {

        const [data, setData] = useState([]);

        useEffect(() => {
            fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
                .then(data => refactorData(data.results))
        }, []) // fetch api for quiz questions
       
    
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
              isRight: false
            }
          }))
    
        }
    

        const quizElements = data.map((arr, index) => {
            return <Question 
            key={arr.question}
            answers={arr.answers}
            answerBoolean={true}
            {...arr}
            />
          }) // Map over questions onto page

          
          

        //   function handleAnswers(index) {
        //     const correctAnswer = data[index].correct_answer
        //     const randomIndex = Math.floor(Math.random() * (data[index].incorrect_answers.length + 1))
        //     const allAnswers = [...data[index].incorrect_answers]
        //     allAnswers.splice(randomIndex, 0, correctAnswer)
          
        //     return allAnswers
        //   } // handles all answers, randomly pushes the correct answer into the incorrect answers array


        // function handleUserAnswer(index, e, question) {
        //     // console.log(`Choice: ${e}, Question: ${question}`)
        //     console.log(index)
        //     console.log(e)
        //     console.log(question)

        //     if (data[index].question === question) {
        //       console.log(true)
        //     } else {
        //       console.log(false)
        //     }

        //    const answers = data.map(el => {
        //      return el.question === question ? e : false
        //   })
        // }

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