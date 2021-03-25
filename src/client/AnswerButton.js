import React from 'react'

const AnswerButton = ({ onclickFunc, answer }) => {
    return (
        <button className="button" onClick={onclickFunc}>
        {answer}
        </button>
    );
}

export default AnswerButton
