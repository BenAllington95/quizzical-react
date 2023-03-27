import React, { useState, useEffect } from 'react';

export default function Question (props) {
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

    // function handleQuestion(str) {

    //     const replacements = {
    //         '&#039;': "'",
    //         '&quot;' : "'"
    //       };

    //     const regex = new RegExp(Object.keys(replacements).join(' '), 'ig')

    //     const newString = str.replace(regex, (match) => {
    //         // use the matched substring as a key to find the corresponding replacement string
    //         return replacements[match.toLowerCase()];
    //       });

    //     return newString    
    // } 

    function handleQuestionString() {
        const string = props.question
        console.log(string)

        const replaceQuestionStr = string.replace(/&#039;|&quot;/g, (match) => {
            if (match === "&#039;") { // &#039; == '
                return "'";
              } else if (match === "&quot;") { // &quot; == "
                return `"`;
              } else {
                return match;
              }
            })

        return replaceQuestionStr
    } // replaces two arguments that need to be changed when being called from api, this includes the double quote and apostrophe symbols




    return (
        <div className="question">
            <h3>{handleQuestionString()}</h3>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}