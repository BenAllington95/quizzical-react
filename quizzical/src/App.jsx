import React, { useState } from 'react';
import Quiz from './components/Quiz'
import Home from './components/Home'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)

 

function handleStartButton() {
    setStartQuiz(true)
} // flip over quiz to start 

// function handleUserAnswer(e, question) {
//   console.log(`Choice: ${e}, Question: ${question}`)

//   // if (data[1].question === question) {
//   //   console.log(true)
//   // } else {
//   //   console.log(false)
//   // }

//   const answers = data.map(el => {
//     return el.question === question ? e : false
//   })

//   console.log(answers)

// }








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
        />}
    </div>
  );
}