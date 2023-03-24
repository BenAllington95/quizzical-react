import React, { useState, useEffect } from 'react';

export default function Question (props, index) {
    const [selectedChoice, setSelectedChoice] = useState(null)

    function handleChoiceClick(e) {
        setSelectedChoice(e)
    }



    const answerElements = props.answers.map(answer => {
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
                {answerElements}
            </div>
        </div>
    )
}