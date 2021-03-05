import React, { useState, useEffect } from "react";
import { getRandomQuizzes, fetchQuizzes } from "./quizzes";

export function Match(props) {
  const n = 3;

  // TODO: Extract state into "match" object
  const [matchIsOver, setMatch] = useState();
  const [quizzes, setQuizzes] = useState();
  const [qN, setQuizNumber] = useState(0);
  const [correctCounter, setCorrectCount] = useState(0);


  function startNewMatch() {
    setMatch(false);
    setQuizzes(getRandomQuizzes(3));
    setQuizNumber(0);
    setCorrectCount(0);
  }

  function handleClick(correct) {
    if (answer === nquizzes[qN].correct_answer) {
      setCorrectCount(correctCounter + 1);
    }

    if (qN >= 2) {
      endMatch();
      return;
    }

    setQuizNumber(qN + 1);
  }

  function renderAnswerTag(answer) {
    return (
      <button className="button" onClick={() => handleClick(answer)}>
        {answer}
      </button>
    );
  }

  function endMatch() {
    setMatch(true);
  }

  if (matchIsOver) {
    return (
      <>
        <h1>Match is over! You got {correctCounter} / 3 correct answers!</h1>
        <button onClick={startNewMatch}>Start new match!</button>
      </>
    );
  } else if (!quizzes) {
    return <h1>NOTLOADED###########</h1>;
  }
  
  // ansswers.map()
  return (
    <div className="quiz-container" id={"quiz-id-"}>
      <h1 className="question">{quizzes[qN].question}</h1>
      <h3>{qN + 1 + " / " + n}</h3>
      <div id="button-container">
        {renderAnswerTag(quizzes[qN].answers[0])}
        {renderAnswerTag(quizzes[qN].answers[1])}
        {renderAnswerTag(quizzes[qN].answers[2])}
        {renderAnswerTag(quizzes[qN].answers[3])}
      </div>
    </div>
  );
}
