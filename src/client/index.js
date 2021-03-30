import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Match } from "./match";
import { Home } from "./home";
import { NotFound } from "./not_found";

const App = () => {
  const [quizAmount, setQuizAmount] = useState(2);

  // TODO: Fix 404
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home amount={quizAmount} onVChange={setQuizAmount} />
        </Route>
        <Route exact path="/match">
          <Match amount={quizAmount} onVChange={setQuizAmount} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));