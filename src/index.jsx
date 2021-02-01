import React from "react";
import ReactDOM from "react-dom";
import { getRandomQuizzes } from "./quizzes";

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {quiz: getRandomQuizzes(1)[0]};
  }
  
  handleClick(correct) {
    if(correct) {
      alert("Correct");
      this.setState({quiz: getRandomQuizzes(1)[0]});
    } else {
      alert("Incorrect");
    }
  }
  
  renderAnswerTag(answer, correct) {
    return <button class="button" onClick={() => this.handleClick(correct)}>{answer}</button>
  }

  render() {
    return (
      <div>
        <h1>{this.state.quiz.question}</h1>
        <div id="button-container">
          {this.renderAnswerTag(
            this.state.quiz.alternatives[0],
            this.state.quiz.correct === 0
          )}
          {this.renderAnswerTag(
            this.state.quiz.alternatives[1],
            this.state.quiz.correct === 1
          )}
          {this.renderAnswerTag(
            this.state.quiz.alternatives[2],
            this.state.quiz.correct === 2
          )}
          {this.renderAnswerTag(
            this.state.quiz.alternatives[3],
            this.state.quiz.correct === 3
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

/*
let questionHeader = document.getElementById("question-header");
let buttonContainer = document.getElementById("button-container");

export function render(quiz) {
  buttonContainer.innerHTML = "";
  questionHeader.innerHTML = quiz.question;
  
  let buttons = "";
  for(let i = 0; i < quiz.alternatives.length; i++) {
      buttons += answerTag(quiz.alternatives[i], quiz.correct === i);
  }
  
  buttonContainer.innerHTML = buttons;
}

function answerTag(answer, correct) {
    let onclick = "";
    
    if(correct) {
        onclick += "alert('Correct!'); EntryPoint.newQuiz();";
    } else {
        onclick += "alert('Wrong answer');";
    }
    
    return `<button class="button" onclick="${onclick}">${answer}</button>`;
    
}


export function newQuiz() {
    render(getRandomQuizzes(1)[0]);
}
*/
