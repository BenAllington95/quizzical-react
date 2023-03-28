import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  function handleStartButton() {
      setStartQuiz(true)
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