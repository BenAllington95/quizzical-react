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
  answers={handleAnswers(index)}
  {...arr}
  />
}) // Map over questions onto page

function handleAnswers(index) {
  const correctAnswer = data[index].correct_answer
  const randomIndex = Math.floor(Math.random() * (data[index].incorrect_answers.length + 1))
  const allAnswers = [...data[index].incorrect_answers]
  allAnswers.splice(randomIndex, 0, correctAnswer)

  return allAnswers

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
        quizElements={quizElements}
        />}
    </div>
  );
}