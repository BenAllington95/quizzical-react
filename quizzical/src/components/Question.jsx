import React, { useState } from 'react';

export default function Question (props) {

    const [selectedChoice, setSelectedChoice] = useState(null)


    function handleChoiceClick(answer) {

      if (props.quizzical === false) {
        setSelectedChoice(answer)
        props.holdAnswer(props.id, answer)
      } // to stop changing answer after submitting

    } // when the answer is clicked, the text string will be set in selectedChoice state - this will link will set the active button so that an active class can be set to the element 
    
    const answerElements = props.answers.map((answer, index) => {
        return (
            <div 
            key={answer}
            className={selectedChoice === answer ? "answer active" : "answer"}
            onClick={() => handleChoiceClick(answer)}>
              <p>{answer}</p>
            </div>
        )

    }) // maps through the prop answers array and converts into HTML, including a ternary that will give an active class to the element if the text matches the string of the element


    

    const checkedAnswerElements = props.answers.map((answer, index) => {

      const isCorrect = answer === props.correctAnswer
      const isSelected = answer === selectedChoice
      const isIncorrect = answer !== props.correctAnswer && isSelected

      const correctAnswerStyle = {
        backgroundColor: isIncorrect ? "#F8BCBC" : isCorrect ? "#94D7A2" : "whitesmoke",
        border: isIncorrect ? "1px solid #F8BCBC" : isCorrect ? "1px solid #94D7A2" : "1px solid rgba(77, 91, 158, 0.5)",
        color: isCorrect ? "whitesmoke" : "blue",
        opacity: isCorrect ? "1.0" : "0.7",
        fontWeight: isCorrect || isIncorrect ? "bold" : "500"
      }

      return (
          <div 
          key={answer}
          className="answer"
          style={correctAnswerStyle}>
            <p>{answer}</p>
          </div>
      )

  }) // new answer element map to use after the submit butotn is pressed, to compare answers and change styles


    // function handleString(str) {
    //     const string = str
    //     const replaceStr = string.replace(/&#039;|&quot;|&ldquo;|&lrm;|&Aacute;|&amp;/g, (match) => {
    //         if (match === "&#039;") { // &#039; === '
    //             return "'";
    //           } else if (match === "&quot;") { // &quot; === "
    //             return `"`;
    //           } else if (match === "&ldquo;") { // &ldquo; === "
    //             return `"`;
    //           } else if (match === "&amp;") { // &amp; === &
    //             return `&`;
    //           } else if (match === "&lrm;") { // &lrm; === "
    //             return ``;
    //           } else if (match === "&Aacute;") {
    //             return `Á`;
    //           } else {
    //             return match;
    //           }
    //         })
    //     return replaceStr
    // } // replaces two arguments that need to be changed when being called from audes the double quote and apostrophe symbols. &lrm;


    function handleString(str){
      const parser = new DOMParser();
      const decodedString = parser.parseFromString(`<!doctype html><body>${str}`, 'text/html').body.textContent;
      return decodedString;
  } // converts back into html format, specifically for text, used ChatGpt for this function


    return (
        <div className="question">
            <h3>{handleString(props.question)}</h3>
            <div className="answers">
                {!props.quizzical ? answerElements : checkedAnswerElements}
            </div>
        </div>
    )
}


// <p key={answer} 
    // onClick={() => handleChoiceClick(answer)} 
    // id={answer} 
    // style={answerStyle}
    // // className={selectedChoice === answer ? "answer active" : "answer"}
    // >
    //     {handleString(answer)}
    // </p> 