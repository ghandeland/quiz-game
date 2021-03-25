const _ = require("lodash");

const quizzes = [
  {
    question: "Which of these is an African country?",
    alternatives: ["Bolivia", "Myanmar", "Curiba"],
    correct: "Mozambique",
    id: 0,
  },
  {
    question: "How many centilitres in a litre?",
    alternatives: ["100", "10", "10000"],
    correct: "1000",
    id: 1,
  },
  {
    question: "3x - 7 = 92 // What is x?",
    alternatives: ["14", "30", "41"],
    correct: "33",
    id: 2,
  },
  {
    question: "How many colors are there in a rainbow?",
    alternatives: ["6", "9", "11"],
    correct: "7",
    id: 3,
  },
  {
    question: "Which of these colours is NOT featured in the logo for Google?",
    alternatives: ["Yellow", "Blue", "Green"],
    correct: "Orange",
    id: 4,
  },
  {
    question:
      "What is the name of the three headed dog in Harry Potter and the Sorcerers Stone?",
    alternatives: ["Spikey", "Poofy", "Spot"],
    correct: "Fluffy",
    id: 5,
  },
];

const getRandomQuizzes = (n) => {
  if (n < 1 || n > quizzes.length) {
    throw "Index out of bounds";
  }

  let indexes = new Array(quizzes.length).fill(0).map((_, i) => i);
  const randQuizzes = [];
  console.log("Indexes length: " + indexes.length);

  while (randQuizzes.length < n) {
    let randIndex = _.random(indexes.length - 1);
    randQuizzes.push(quizzes[indexes[randIndex]]);
    indexes.splice(randIndex, 1);
  }
  console.log(randQuizzes);
  return randQuizzes;
};

exports.quizzes = quizzes;
exports.getRandomQuizzes = getRandomQuizzes;

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
