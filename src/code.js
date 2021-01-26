import { getRandomQuizzes } from "./quizzes";

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