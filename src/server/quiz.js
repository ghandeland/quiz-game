const _ = require("lodash");

// Quiz data
const quizzes = [
  {
    question: "Which of these is an African country?",
    alternatives: [
      { answer: "Bolivia", aId: 0 },
      { answer: "Myanmar", aId: 1 },
      { answer: "Mozambique", aId: 2 },
      { answer: "Curiba", aId: 3 },
    ],
    qId: 0,
  },
  {
    question: "How many centilitres in a litre?",
    alternatives: [
      { answer: "100", aId: 0 },
      { answer: "10", aId: 1 },
      { answer: "10000", aId: 2 },
      { answer: "1000", aId: 3 },
    ],
    qId: 1,
  },
  {
    question: "3x - 7 = 92 // What is x?",
    alternatives: [
      { answer: "33", aId: 0 },
      { answer: "14", aId: 1 },
      { answer: "30", aId: 2 },
      { answer: "41", aId: 3 },
    ],
    qId: 2,
  },
  {
    question: "How many colors are there in a rainbow?",
    alternatives: [
      { answer: "6", aId: 0 },
      { answer: "7", aId: 1 },
      { answer: "9", aId: 2 },
      { answer: "11", aId: 3 },
    ],
    qId: 3,
  },
  {
    question: "Which of these colours is NOT featured in the logo for Google?",
    alternatives: [
      { answer: "Yellow", aId: 0 },
      { answer: "Blue", aId: 1 },
      { answer: "Green", aId: 2 },
      { answer: "Orange", aId: 3 },
    ],
    qId: 4,
  },
  {
    question:
      "What is the name of the three headed dog in Harry Potter and the Sorcerers Stone?",
    alternatives: [
      { answer: "Fluffy", aId: 0 },
      { answer: "Spoofy", aId: 1 },
      { answer: "Spotty", aId: 2 },
      { answer: "Poofy", aId: 3 },
    ],
    qId: 5,
  },
];

// Pairs of quiz IDs with ID of correct answer
const solutions = {
  0: 2,
  1: 3,
  2: 0,
  3: 1,
  4: 3,
  5: 0,
};

// Check if answer is correct given a quiz ID and answer ID
const checkAnswer = (qId, aId) => {
  return solutions[qId] === aId;
}

// Pick n random quizzes
const getRandomQuizzes = (n) => {
  if (n < 1 || n > quizzes.length) {
    throw "Index out of bounds";
  }
  
  let indexes = new Array(quizzes.length).fill(0).map((_, i) => i);
  const randQuizzes = [];
  
  // Pick a random index and delete from indexes after picking quiz
  while (randQuizzes.length < n) {
    const randIndex = _.random(indexes.length - 1);
    const quiz = quizzes[indexes[randIndex]];
    quiz.alternatives = _.shuffle(quiz.alternatives); // Shuffle answers
    randQuizzes.push(quiz);
    indexes.splice(randIndex, 1);
  }
  
  return randQuizzes;
};

exports.quizzes = quizzes;
exports.getRandomQuizzes = getRandomQuizzes;
exports.checkAnswer = checkAnswer;






// export async function fetchQuizzes(amount) {
//   let response;
//   let payload;
//   let nquizzes;
//   let url = `https://opentdb.com/api.php?amount=${amount}&difficulty=medium&type=multiple`;

//   try {
//     response = await fetch(url);
//     payload = await response.json();
//   } catch (err) {
//     console.log("Error");
//   }

//   if (response.status === 200) {
//     nquizzes = payload.results;

//     for (let i = 0; i < amount; i++) {
//       let allAnswers = [
//         nquizzes[i].incorrect_answers[0],
//         nquizzes[i].incorrect_answers[1],
//         nquizzes[i].incorrect_answers[2],
//         nquizzes[i].correct_answer,
//       ];

//       nquizzes[i].answers = allAnswers.sort(() => Math.random() - 0.5);
//     }
//   }

//   console.log(nquizzes);

//   return nquizzes;
// }
