import React, { useState } from 'react';
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [apiConditions, setApiConditions] = useState([])


  function handleStartButton() {
      setStartQuiz(prevBoolean => !prevBoolean)
  }  // flips the startQuiz to true to hide start screen and load the quiz
  



  function handleQuestionData(form) {
    setApiConditions(prevQuestions => {
        return {
          ...prevQuestions,
          amountOfQuestions: form.amountOfQuestions,
          category: form.category,
          difficulty: form.difficulty
        }
      })
  }



  return (
    <div className="App">
        {!startQuiz ? 
        <Home 
        key="start"
        startQuiz={handleStartButton}
        handleQuestionData={handleQuestionData}
        /> 
        :
        <Quiz 
        key="quiz"
        resetQuiz={handleStartButton}
        startQuiz={startQuiz}
        apiConditions={apiConditions}
        />}
    </div>
  );
}