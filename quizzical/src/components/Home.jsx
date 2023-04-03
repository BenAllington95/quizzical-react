import React, { useState, useEffect } from 'react';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';

export default function Home(props) {

    const [formData, setFormData] = useState({
        amountOfQuestions: "5",
        category:"9",
        difficulty: "easy"
    })



    function handleFormUpdate(event) {

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value                
            }
        })
    }



    return (
        <div className="quiz">

        <img className="blue-blob" src={blueBlob} />
        <img className="yellow-blob" src={yellowBlob} />

            <div className="start-items">    
                <h1 className="start-title">Quizzical</h1>
                <p className="start-description">Test your knowledge and challenge yourself with our quiz app!</p>
                <form>
                    <label htmlFor="number-input">
                    Number of Questions: {formData.amountOfQuestions}
                    <input
                        type="range"
                        name="amountOfQuestions"
                        className="slider"
                        min="5"
                        max="10"
                        value={formData.amountOfQuestions}
                        onChange={(event) => handleFormUpdate(event)}
                    />
                    </label>

                    <label htmlFor="category-input">
                    Category: 
                    <select 
                    onChange={(event) => handleFormUpdate(event)} 
                    className="form-list"
                    name="category">
                        <option value="">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japenese Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>
                    </label>
                    
                    <label htmlFor="difficulty-input">
                    Difficulty: 
                    <select onChange={(event) => handleFormUpdate(event)}name="difficulty"
                    className="form-list">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    </label>

                </form>

                <button className="start-button" onClick={() => {
                props.startQuiz()
                props.handleQuestionData(formData)
                }}>
                Start Quiz
                </button>
            </div>
        </div>
    )
}