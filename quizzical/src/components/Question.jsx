import React, { useState, useEffect } from 'react';

export default function Question (props) {
    const [selectedChoice, setSelectedChoice] = useState(null)

    function handleChoiceClick(e) {
        setSelectedChoice(e)
    }

    console.log(selectedChoice)

    // console.log(props.handleAnswers())

    const answerElements = props.incorrect_answers.map(answer => {
        return (
            <p key={answer} 
            onClick={(event) => handleChoiceClick(event.target.id)} 
            id={answer} 
            className={selectedChoice === answer ? "answer active" : "answer"}>{answer}
            </p>
        )
    })

    return (
        <div className="question">
            <h3>{props.question.replaceAll('&quot;', '"')}</h3>
            <div className="answers">
                <p id={props.correct_answer} className="answer">{props.correct_answer}</p>
                {answerElements}
            </div>
        </div>
    )
}