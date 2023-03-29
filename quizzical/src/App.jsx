import React, { useState } from 'react';
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  function handleStartButton() {
      setStartQuiz(prevBoolean => !prevBoolean)
  }  // flips the startQuiz to true to hide start screen and load the quiz
  
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
        resetQuiz={handleStartButton}
        startQuiz={startQuiz}
        />}
    </div>
  );
}