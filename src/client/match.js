import React, { useState, useEffect } from "react";
import { useLoading } from "./utlis/useLoading";
import { fetchJson, postJson } from "./utlis/http";
import AnswerButton from "./AnswerButton";
import InputField from "./InputField";

export function Match({ amount, onVChange }) {
  // {loading, error, data, refetch}
  let fetchObj = useLoading(() => fetchJson("/api/quiz/start/" + amount));

  const [match, setMatch] = useState({
    quizIndex: 0,
    correctCount: 0,
    matchIsOver: false,
  });
  const [answers, setAnswers] = useState([]);
  const [quizzes, setQuizzes] = useState(undefined);

  // When data object is fetched/refetched, insert it into state
  useEffect(() => {
    setQuizzes(fetchObj.data);
  }, [fetchObj.data]);

  // useEffect(() => {
  //   logAnswerCache();
  // }, [answers]);

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

  const endMatch = () => {
    
    setMatch((prevState) => {
      return { ...prevState, matchIsOver: true };
    });
  };

  function cacheAnswer(questionId, answerId) {
    let postOK = postJson("/api/quiz/answer", {
      qId: questionId,
      aId: answerId,
    });

    // End match
    if (match.quizIndex >= quizzes.length - 1) {
      endMatch();
    }

    // Increase quizIndex in state
    setMatch((prevState) => {
      return { ...prevState, quizIndex: prevState.quizIndex + 1 };
    });
  }

  if (fetchObj.loading || !fetchObj.data) {
    return <h1>Lodaing...</h1>;
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
        {quizzes[match.quizIndex].alternatives.map((alt, i) => (
          <AnswerButton
            key={i}
            onclickFunc={() =>
              cacheAnswer(quizzes[match.quizIndex].qId, alt.aId)
            }
            answer={alt.answer}
          />
        ))}
        <div>quizIndex: {match.quizIndex}</div>
        <div>correctCount: {match.correctCount}</div>
        <div>matchIsOver: {match.matchIsOver}</div>
        <div>quizzes.length: {quizzes.length}</div>
      </div>
    </div>
  );
}
