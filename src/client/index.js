import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { Match } from "./Match";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { NotFound } from "./ui/not_found";
import { ProfilePage } from "./ProfilePage";
import { TestPage } from "./TestPage";

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
            <HomePage amount={quizAmount} onVChange={setQuizAmount} />
          </Route>
          <Route exact path="/match">
            <Match amount={quizAmount} onVChange={setQuizAmount} />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/testpage">
            <TestPage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));