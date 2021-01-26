
// Figure out import
let quizIndex = 0;
let quizArray = getRandomQuizzes(2);
let quiz = quizArray[quizIndex];

let questionHeader = document.getElementById("question-header");
let buttonContainer = document.getElementById("button-container");

render();

function render() {
    
    buttonContainer.innerHTML = "";
    questionHeader.innerHTML = quiz.question;
    for (let i = 0; i < quiz.alternatives.length; i++) {
      buttonContainer.innerHTML += `<button class="button" 
        id="btn-${i}"
        onclick="selectAnswer(${i})">
        ${quiz.alternatives[i]}
        </button>`;
    }
    
}

function selectAnswer(value) {    
    if(value === quiz.correct) {
        if (quizIndex === quizArray.length - 1) {
          endQuiz();
          return;
        }
        
        newQuiz();
    } else {
        alert("Wrong!");
    }
}

function newQuiz() {
    quizIndex++;
    quiz = quizArray[quizIndex];
    render();
}

function endQuiz() {
    console.log("End");
    alert("End");
}


