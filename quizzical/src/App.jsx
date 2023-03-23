import React, { useState, useEffect } from 'react';
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


const quizElements = data.map(arr => {
    return <Question 
    key={arr.question} 
    {...arr}
    />
}) // Map over questions onto page

function handleStartButton() {
    setStartQuiz(true)
} // flip over quiz to start 

{/* <div id="questions" className="questions">
            {quizElements}
        </div> */}

  return (
    <div className="App">
        {!startQuiz ? 
        <Home 
        key="start"
        startQuiz={handleStartButton}
        /> 
        : 
        <h1>test</h1>}
    </div>
  );
}