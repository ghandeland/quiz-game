import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { Match } from "./match";
import { Home } from "./home";
import { Login } from "./login";
import { NotFound } from "./ui/not_found";

const App = () => {
  const [quizAmount, setQuizAmount] = useState(2);
  const testUseLoc = () => {
    console.log(window.location.href);
  }
  
  // TODO: Fix 404
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home amount={quizAmount} onVChange={setQuizAmount} />
          </Route>
          <Route exact path="/match">
            <Match amount={quizAmount} onVChange={setQuizAmount} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));