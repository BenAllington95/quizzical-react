import React, { useState, useEffect } from 'react';
import Question from './components/Question'

export default function App() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
    
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
        .then(data => setData(data.results))
    
    
  }, []);


const quizElements = data.map(element => {
    return (<li>{element.question}</li>)
})





  return (
    <div>
        <ul>
            {quizElements}
        </ul>
    </div>
  );
}