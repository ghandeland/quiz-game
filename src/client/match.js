import React, { useState, useEffect } from "react";
import { useLoading } from "./utlis/useLoading";
import { fetchJson } from "./utlis/http";
import { shuffle } from "lodash";
import AnswerButton from "./AnswerButton";

export function Match(props) {
  const { loading, error, data } = useLoading(() => fetchJson("/api/quiz"));

  const [match, setMatch] = useState({
    quizIndex: 0,
    correctCount: 0,
    matchIsOver: false
  });
  const [quizzes, setQuizzes] = useState(undefined);
  const [currentQuiz, setCurrentQuiz] = useState();

  useEffect(() => {
    setQuizzes(data);
    if (data) {
      shuffleAnswers();
    }
  }, [data, match.quizIndex]);
  
  
  function shuffleAnswers() {
    console.log(match.quizIndex);
    let shuffledQuizzes = shuffle([
      ...data[match.quizIndex].alternatives,
      data[match.quizIndex].correct,
    ]);
    setCurrentQuiz(shuffledQuizzes);
  }

  function startNewMatch() {
    setMatch({
      quizIndex: 0,
      correctCount: 0,
      matchIsOver: false,
    });
    // Fetch new quizzes
  }

  function checkAnswer(answer) {
    if (answer === quizzes[match.quizIndex].correct) {
      setMatch(prevState => {
      return { ...prevState, correctCount: prevState.correctCount + 1 }
      });
    }
    
    // TODO: Logic for ending quiz
    // if (match.quizIndex >= (quizzes.length - 1)) {
    //   endMatch();
    //   return;
    // }

    setMatch(prevState => {
      return { ...prevState, quizIndex: prevState.quizIndex + 1 }
    });
    
    shuffleAnswers();
  }

  function endMatch() {
    setMatch(true);
  }

  if (loading || !data) {
    return <h1>Loding...</h1>;
  }

  if (match.matchIsOver) {
    return (
      <>
        <h1>Match is over! You got TODO / 3 correct answers!</h1>
        <button onClick={startNewMatch}>Start new match!</button>
      </>
    );
  }

  return (
    <div className="quiz-container" id={"quiz-id-"}>
      <h1 className="question">{quizzes[match.quizIndex].question}</h1>
      <h3>{match.quizIndex + 1 + " / " + quizzes.length}</h3>
      <div id="button-container">
        {currentQuiz.map((a, i) => (
          <AnswerButton key={i} onclickFunc={() => checkAnswer(a)} answer={a} />
        ))}
        <div>quizIndex: {match.quizIndex}</div>
        <div>correctCount: {match.correctCount}</div>
        <div>matchIsOver: {match.matchIsOver}</div>
        <div>quizzes.length: {quizzes.length}</div>
      </div>
    </div>
  );
}
