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

      const answerStyle = {
        backgroundColor: selectedChoice === answer ? "#293264" : "white",
        borderRadius: "8px",
        padding: "0.5em",
        transition: "all 0.2s",
        width: "25%",
        minHeight: "36px",
        cursor: "pointer",
        textAlign: "center"
      }

      const correctAnswerStyle = {
        backgroundColor: answer === props.correctAnswer ? "green" : "grey",
        transition: "all 0.5s",
        borderRadius: "8px",
        padding: "0.5em",
        width: "25%",
        minHeight: "36px",
        cursor: "pointer",
        textAlign: "center",
        color: answer === props.correctAnswer ? "white" : "black"
      }

      const textStyle = {
        color: selectedChoice === answer ? "white" : "#293264",
        fontSize: "0.9rem"
      }


        return (
            <div 
            key={answer}
            style={props.quizzical ? correctAnswerStyle : answerStyle}
            onClick={() => handleChoiceClick(answer)}>
              <p style={textStyle}>{answer}</p>
            </div>
        )
    }) // maps through the prop answers array and converts into HTML, including a ternary that will give an active class to the element if the text matches the string of the element

    // <p key={answer} 
    // onClick={() => handleChoiceClick(answer)} 
    // id={answer} 
    // style={answerStyle}
    // // className={selectedChoice === answer ? "answer active" : "answer"}
    // >
    //     {handleString(answer)}
    // </p> 

    function handleString(str) {
        const string = str
        const replaceStr = string.replace(/&#039;|&quot;|&ldquo;|&lrm;|&Aacute;|&amp;/g, (match) => {
            if (match === "&#039;") { // &#039; === '
                return "'";
              } else if (match === "&quot;") { // &quot; === "
                return `"`;
              } else if (match === "&ldquo;") { // &ldquo; === "
                return `"`;
              } else if (match === "&amp;") { // &amp; === &
                return `&`;
              } else if (match === "&lrm;") { // &lrm; === "
                return ``;
              } else if (match === "&Aacute;") {
                return `Á`;
              } else {
                return match;
              }
            })
        return replaceStr
    } // replaces two arguments that need to be changed when being called from api, this includes the double quote and apostrophe symbols. &lrm;


    return (
        <div className="question">
            <h3>{handleString(props.question)}</h3>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}