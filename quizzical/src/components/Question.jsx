import React, { useState, useEffect } from 'react';

export default function Question (props) {

    // console.log(props.handleAnswers())

    const answerElements = props.incorrect_answers.map(answer => {
        return (
            <p key={answer} onClick={() => console.log(answer)} id={answer} className="answer">{answer}</p>
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