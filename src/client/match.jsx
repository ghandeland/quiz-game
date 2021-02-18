import React, {useState} from "react";
import { getRandomQuizzes } from "./quizzes";

export function Match(props) {
    // TODO: Extract state into "match" object
    const [matchIsOver, setMatch] = useState(false);
    const [quizzes, setQuizzes] = useState(getRandomQuizzes(3));
    const [qN, setQuizNumber] = useState(0);
    const [correctCounter, setCorrectCount] = useState(0);
    
    function startNewMatch() {
      setMatch(false)
      setQuizzes(getRandomQuizzes(3));
      setQuizNumber(0)
      setCorrectCount(0)
    }
    
    function handleClick(correct) {
      if (correct) {
        setCorrectCount(correctCounter + 1);
      }
      
      if(qN >= 2) {
        endMatch();
        return;
      }
      
      setQuizNumber(qN + 1);
      

    }
  
    function renderAnswerTag(answer, correct) {
        return <button className="button" onClick={() => handleClick(correct)}>{answer}</button>
    }
    
    function endMatch() {
      setMatch(true);
    }
    
    if(matchIsOver) {
      return(
        <>
          <h1>Match is over! You got {correctCounter} / 3 correct answers!</h1>
          <button onClick={startNewMatch}>Start new match!</button>
        </>
      );
    } else {
      return (
        <div className="quiz-container">
          <h1 className="question">{quizzes[qN].question}</h1>
          <h3>{qN + 1} / 3</h3>
          <div id="button-container">
            {renderAnswerTag(
              quizzes[qN].alternatives[0],
              quizzes[qN].correct === 0
            )}
            {renderAnswerTag(
              quizzes[qN].alternatives[1],
              quizzes[qN].correct === 1
            )}
            {renderAnswerTag(
              quizzes[qN].alternatives[2],
              quizzes[qN].correct === 2
            )}
            {renderAnswerTag(
              quizzes[qN].alternatives[3],
              quizzes[qN].correct === 3
            )}
          </div>
        </div>
      );
    }
    
  }
    