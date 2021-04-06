import React, { useState, useEffect } from "react";
import { useLoading } from "./utlis/useLoading";
import { fetchJson, postJson } from "./utlis/http";
import AnswerButton from "./ui/AnswerButton";
import InputField from "./ui/InputField";
import HomeButton from "./ui/HomeButton";

export function Match({ amount, onVChange }) {
  /// Match data
  const [match, setMatch] = useState({
    quizIndex: 0,
    matchIsOver: false,
  });

  // Quiz data
  const [quizzes, setQuizzes] = useState();
  // Result data
  const [quizResult, setQuizResult] = useState();

  // { loading, error, data, refetch }
  let quizFetchObj = useLoading(() => fetchJson("/api/quiz/start/" + amount));
  let resultFetchObj = useLoading(() => fetchJson("/api/quiz/result"));

  // When data object is fetched/refetched, insert it into state
  useEffect(() => {
    if (quizFetchObj.data) {
      // TODO: When 0 correct, no character is displayed
      setQuizzes(quizFetchObj.data);
    }
  }, [quizFetchObj.data]);

  useEffect(() => {
    if (resultFetchObj.data) {
      setQuizResult(resultFetchObj.data);
    }
  }, [resultFetchObj.data]);

  const startMatch = () => {
    // Fetch new quiz-data
    quizFetchObj.refetch({});

    // Reset match state
    setMatch({
      quizIndex: 0,
      matchIsOver: false,
    });
  };

  const endMatch = () => {
    setMatch((prevState) => {
      return { ...prevState, matchIsOver: true };
    });
    // Fetch new result & new quizzes
    resultFetchObj.refetch({});
  };

  function cacheAnswer(questionId, answerId) {
    let postOK = postJson("/api/quiz/answer", {
      qId: questionId,
      aId: answerId,
    });

    if (match.quizIndex >= quizzes.length - 1) {
      endMatch();
    } else {
      // Increase quizIndex in state
      setMatch((prevState) => {
        return { ...prevState, quizIndex: prevState.quizIndex + 1 };
      });
    }
  }

  if (resultFetchObj.error) {
    return <h1>Fetch error</h1>;
  }

  if (resultFetchObj.loading || typeof resultFetchObj.data === "undefined") {
    return <h1>Fetching results...</h1>;
  }

  if (quizFetchObj.loading || !quizFetchObj.data) {
    return <h1>Fetching quiz data...</h1>;
  }

  if (match.matchIsOver) {
    return (
      <>
        <h1>
          Match is over! You got {quizResult} / {quizzes.length} correct
          answers!
        </h1>
        <InputField
          label="Number of quizzes"
          type="number"
          value={amount}
          onValueChange={onVChange}
        />
        <button onClick={startMatch}>Start new match!</button>
        <HomeButton />
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
      </div>
      <HomeButton />
    </div>
  );
}
