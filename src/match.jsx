import React, {useState} from "react";
import { getRandomQuizzes } from "./quizzes";

export function Match() {
    
    const [quiz, setQuiz] = useState(getRandomQuizzes(1)[0])
    
    
    function handleClick(correct) {
        if(correct) {
            alert("Correct");
            setQuiz(getRandomQuizzes(1)[0]);
        } else {
            alert("Incorrect");
        }
    }
  
    function renderAnswerTag(answer, correct) {
        return <button className="button" onClick={() => handleClick(correct)}>{answer}</button>
    }

    return (
      <div>
        <h1 className="question">{quiz.question}</h1>
        <div id="button-container">
          {renderAnswerTag(quiz.alternatives[0], quiz.correct === 0)}
          {renderAnswerTag(quiz.alternatives[1], quiz.correct === 1)}
          {renderAnswerTag(quiz.alternatives[2], quiz.correct === 2)}
          {renderAnswerTag(quiz.alternatives[3], quiz.correct === 3)}
        </div>
      </div>
    );
  }
    