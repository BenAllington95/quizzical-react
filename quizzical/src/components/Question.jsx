import React, { useState, useEffect } from 'react';

export default function Question (props) {

    

    return (
        <div className="question">
            <p>{props.question}</p>
        </div>
    )
}