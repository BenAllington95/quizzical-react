import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
import Question from '../components/Question'



export default function Quiz(props) {

    // function submitAnswer(answer) {
    //     console.log(`your answer was: ${answer}`)
    // } 

        const quizElements = props.data.map((arr, index) => {
            return <Question 
            key={arr.question}
            answers={handleAnswers(index)}
            answerBoolean={true}
            {...arr}
            />
          }) // Map over questions onto page

          
          

          function handleAnswers(index) {
            const correctAnswer = props.data[index].correct_answer
            const randomIndex = Math.floor(Math.random() * (props.data[index].incorrect_answers.length + 1))
            const allAnswers = [...props.data[index].incorrect_answers]
            allAnswers.splice(randomIndex, 0, correctAnswer)
          
            return allAnswers
          } // handles all answers, randomly pushes the correct answer into the incorrect answers array


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