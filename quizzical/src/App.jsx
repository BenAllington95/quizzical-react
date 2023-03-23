import React, { useState, useEffect } from 'react';
import Question from './components/Question'

export default function App() {
    
    const [data, setData] = useState([]);

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

// console.log(data[0].correct_answer)

  return (
    <div className="App">
        <div className="questions">
            {quizElements}
        </div>
    </div>
  );
}