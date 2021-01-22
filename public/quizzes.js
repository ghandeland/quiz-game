

function getRandomQuizzes(numberOfQuizzes) {
    let quizIndexes;
    const randomQuizzes;
    
    for(let i = 0; i < quizzes.length; i++) {
        quizIndexes[i] = i;
    }
    
    for(let i = 0; i < numberOfQuizzes; i++) {
        const randomIndex = Math.floor(Math.random() * quizIndexes.length);
        randomQuizzes.push(quizzes[quizIndexes[randomIndex]]);
        quizIndexes.splice(randomIndex);
    }
    
    return randomQuizzes;
}

const quizzes = [
  {
    question: "Which of these is an African country?",
    alternatives: ["Bolivia", "Mozambique", "Myanmar", "Curiba"],
    correct: 1,
  },
  {
    question: "How many centilitres in a litre?",
    alternatives: ["100", "1000", "10", "10000"],
    correct: 0,
  },
  {
    question: "3x - 7 = 92 // What is x?",
    alternatives: ["14", "30", "41", "33"],
    correct: 3,
  },
];
