
let currentQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
let questionHeader = document.getElementById("question-header");
let buttonContainer = document.getElementById("button-container");

questionHeader.innerHTML = currentQuiz.question;
for(let i = 0; i < currentQuiz.alternatives.length; i++) {
    buttonContainer.innerHTML += `<button class="button" 
    id="btn-${i}"
    onclick="selectAnswer(${i})">
    ${currentQuiz.alternatives[i]}
    </button>`;
}

function selectAnswer(value) {
    if(value === currentQuiz.correct) {
        newQuiz();
    } else {
        alert("Wrong!");
    }
}

function newQuiz() {
    currentQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    questionHeader.innerHTML = currentQuiz.question;
    
    buttonContainer.innerHTML = "";
    for (let i = 0; i < currentQuiz.alternatives.length; i++) {
        buttonContainer.innerHTML += `<button class="button" 
        id="btn-${i}"
        onclick="selectAnswer(${i})">
        ${currentQuiz.alternatives[i]}
        </button>`;
    }
}


