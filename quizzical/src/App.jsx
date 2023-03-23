import React, { useState, useEffect } from 'react';
import Question from './components/Question'
import Start from './components/Start'


export default function App() {
    
    const [data, setData] = useState([]);
    const [startQuiz, setStartQuiz] = useState(false)

    useEffect(() => {
    
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
        .then(data => setData(data.results))
    
    
  }, []);


const quizElements = data.map(arr => {
    return <Question 
    key={arr.question} 
    {...arr}
    />
})

const mainPage = (
    <div id="main">
        <h1>Quizzical</h1>
        <h1>Some description if needed</h1>
        <h1>Start Quiz</h1>
    </div>
)

function handleStartButton() {
    console.log("handleStartButton click")
}

// console.log(data[0].correct_answer)

{/* <div id="questions" className="questions">
            {quizElements}
        </div> */}

  return (
    <div className="App">
        {!startQuiz ? 
        <Start 
        key="start"
        startQuiz={handleStartButton}
        /> 
        : 
        <h1>test</h1>}
    </div>
  );
}