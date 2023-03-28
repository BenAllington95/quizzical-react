import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState([])

  function handleStartButton() {
      setStartQuiz(true)
  } 

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

  

  return (
    <div className="App">
        {!startQuiz ? 
        <Home 
        key="start"
        startQuiz={handleStartButton}
        /> 
        : 
        <Quiz 
        key="quiz"
        data={data}
        />}
    </div>
  );
}