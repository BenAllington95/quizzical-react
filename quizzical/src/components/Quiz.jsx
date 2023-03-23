import React from 'react'
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';


export default function Quiz(props) {
    return (
        <div className="quiz">

        <img className="blue-blob" src={blueBlob} />
        <img className="yellow-blob" src={yellowBlob} />

            <div className="questions">
                {props.quizElements}
            </div>
            <button>test</button>

        </div>
    )
}