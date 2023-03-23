import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz'
import Question from './components/Question'
import Home from './components/Home'


export default function App() {
    
  const [data, setData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false)

  useEffect(() => {
  fetch('https://opentdb.com/api.php?amount=5')
    .then(response => response.json())
      .then(data => setData(data.results))
  }, []) // fetch api for quiz questions

function handleStartButton() {
    setStartQuiz(true)
} // flip over quiz to start 

const quizElements = data.map((arr, index) => {
  return <Question 
  key={arr.question}
  {...arr}
  />
}) // Map over questions onto page

function handleAnswers(index) {
  let correctAnswer = data[index].correct_answer
  let incorrectAnswers = data[index].incorrect_answers
  let randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
  incorrectAnswers.splice(randomIndex, 0, correctAnswer);
  console.log(correctAnswer)

  return incorrectAnswers
}

console.log(handleAnswers(0))

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
        quizElements={quizElements}
        />}
    </div>
  );
}