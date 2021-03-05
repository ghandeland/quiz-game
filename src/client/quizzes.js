export function getRandomQuizzes(numberOfQuizzes) {
    if(numberOfQuizzes < 1 || numberOfQuizzes > quizzes.length) {
      throw "Index out of bounds";
    }
  
    let quizIndexes = [];
    const randomQuizzes = [];
    
    for(let i = 0; i < quizzes.length; i++) {
        quizIndexes[i] = i;
    }
    
    for(let i = 0; i < numberOfQuizzes; i++) {
      let randomIndex = Math.floor(Math.random() * quizIndexes.length);
      randomQuizzes.push(quizzes[quizIndexes[randomIndex]]);
      quizIndexes.splice(randomIndex, 1);
    }

    return randomQuizzes;
}

const quizzes = [
  {
    question: "Which of these is an African country?",
    alternatives: ["Bolivia", "Mozambique", "Myanmar", "Curiba"],
    correct: 1,
    id: 0,
  },
  {
    question: "How many centilitres in a litre?",
    alternatives: ["100", "1000", "10", "10000"],
    correct: 0,
    id: 1,
  },
  {
    question: "3x - 7 = 92 // What is x?",
    alternatives: ["14", "30", "41", "33"],
    correct: 3,
    id: 2
  },
];

export async function fetchQuizzes(amount) {
  let response;
  let payload;
  let nquizzes;
  let url = `https://opentdb.com/api.php?amount=${amount}&difficulty=medium&type=multiple`;

  try {
    response = await fetch(url);
    payload = await response.json();
  } catch (err) {
    console.log("Error");
  }

  if (response.status === 200) {
    nquizzes = payload.results;

    for (let i = 0; i < amount; i++) {
      let allAnswers = [
        nquizzes[i].incorrect_answers[0],
        nquizzes[i].incorrect_answers[1],
        nquizzes[i].incorrect_answers[2],
        nquizzes[i].correct_answer,
      ];

      nquizzes[i].answers = allAnswers.sort(() => Math.random() - 0.5);
    }
  }
  
  console.log(nquizzes);
  return nquizzes;
}