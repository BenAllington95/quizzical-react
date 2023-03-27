import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [data, setData] = useState([]);

  function handleStartButton() {
      setStartQuiz(true)
  } 

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
        .then(data => setData(data.results))
  
      
    }, [startQuiz]) // fetch api for quiz questions

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