import React, { useState, useEffect } from "react";
import { useLoading } from "./utlis/useLoading";
import { fetchJson } from "./utlis/http";
import { shuffle } from "lodash";
import AnswerButton from "./AnswerButton";
import InputField from './InputField'

export function Match({amount, onVChange}) {
  // {loading, error, data, refetch}
  let fetchObj = useLoading(() => fetchJson("/api/quiz/start/" + amount));
  
  const [match, setMatch] = useState({
    quizIndex: 0,
    correctCount: 0,
    matchIsOver: false
  });
  const [quizzes, setQuizzes] = useState(undefined);
  const [currentQuiz, setCurrentQuiz] = useState();
  
  
  useEffect(() => {
    setQuizzes(fetchObj.data);
    if (fetchObj.data && match.quizIndex < amount) {
      shuffleAnswers();
    }
  }, [fetchObj.data, match.quizIndex]);
  
  // Extract all alternatives from fetched data object and shuffle
  function shuffleAnswers() {
    let shuffledQuizzes = shuffle([
      ...fetchObj.data[match.quizIndex].alternatives,
      fetchObj.data[match.quizIndex].correct,
    ]);
    setCurrentQuiz(shuffledQuizzes);
  }

  function startNewMatch() {
    // Fetch new quizzes
    fetchObj.refetch({});

    // Reset match state
    setMatch({
      quizIndex: 0,
      correctCount: 0,
      matchIsOver: false,
    });
  }

  function checkAnswer(answer) {
    // Check if answer is correct
    if (answer === quizzes[match.quizIndex].correct) {
      setMatch(prevState => {
      return { ...prevState, correctCount: prevState.correctCount + 1 }
      });
    }
    
    // End match
    if (match.quizIndex >= (quizzes.length - 1)) {
      setMatch((prevState) => {
        return { ...prevState, matchIsOver: true }
      });
    }

    // Increase quizIndex in state
    setMatch(prevState => {
      return { ...prevState, quizIndex: prevState.quizIndex + 1 }
    });
    
    shuffleAnswers();
  }

  if (fetchObj.loading || !fetchObj.data) {
    return <h1>Loding...</h1>;
  }

  if (match.matchIsOver) {
    return (
      <>
        <h1>
          Match is over! You got {match.correctCount} / {quizzes.length} correct
          answers!
        </h1>
        <InputField
          label="Number of quizzes"
          type="number"
          value={amount}
          onValueChange={onVChange}
        />
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
