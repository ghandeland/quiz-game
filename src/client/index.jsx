import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { Match } from "./match";
import { Home } from "./home"
import { NotFound } from "./not_found"

class App extends React.Component {
  

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/match" component={Match} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));