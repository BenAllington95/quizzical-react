import React, { useState } from 'react';

export default function Question (props) {

    const [selectedChoice, setSelectedChoice] = useState(null)

    function handleChoiceClick(answer) {
        setSelectedChoice(answer)
        props.holdAnswer(props.id, answer)
    } // when the answer is clicked, the text string will be set in selectedChoice state - this will link will set the active button so that an active class can be set to the element 
    
    const answerElements = props.answers.map(answer => {
        return (
            <p key={answer} 
            onClick={(event) => handleChoiceClick(event.target.id)} 
            id={answer} 
            className={selectedChoice === answer ? "answer active" : "answer"}>
                {handleString(answer)}
            </p>
        )
    }) // maps through the prop answers array and converts into HTML, including a ternary that will give an active class to the element if the text matches the string of the element

    function handleString(str) {
        const string = str
        const replaceStr = string.replace(/&#039;|&quot;|&ldquo;|&amp;/g, (match) => {
            if (match === "&#039;") { // &#039; === '
                return "'";
              } else if (match === "&quot;") { // &quot; === "
                return `"`;
              } else if (match === "&ldquo;") { // &ldquo; === "
                return `"`;
              } else if (match === "&amp;") { // &amp; === &
                return `&`;
              } else {
                return match;
              }
            })
        return replaceStr
    } // replaces two arguments that need to be changed when being called from api, this includes the double quote and apostrophe symbols


    return (
        <div className="question">
            <h3>{handleString(props.question)}</h3>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}