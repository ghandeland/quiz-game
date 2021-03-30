import React from 'react'

const AnswerButton = ({ onclickFunc, answer, val }) => {
    return (
        <button className="button" onClick={onclickFunc} value="val">
        {answer}
        </button>
    );
}

export default AnswerButton
