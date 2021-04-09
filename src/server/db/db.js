require("dotenv").config();
const { Pool } = require('pg');
const _ = require("lodash");

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const getRandomQuizzes = async (n) => {
  
  try {
    const quizRes = await pool.query("SELECT * FROM quiz");
    if (n < 1 || n > quizRes.rowCount) {
      throw new RangeError(`Quiz amount must be between 0 and ${maxAmount}`);
    }
    
    const quizzes = quizRes.rows;
    
    let indexes = new Array(quizRes.rowCount).fill(0).map((_, i) => i);
    const randQuizzes = [];
    
    // Pick a random index and delete from indexes after picking quiz
    while (randQuizzes.length < n) {
      const randIndex = _.random(indexes.length - 1);
      const quiz = quizzes[indexes[randIndex]];
      
      const alternativesRes =  await pool.query("SELECT * FROM answer WHERE quiz_id = $1", [quiz.quiz_id]);
      const alternatives = _.shuffle(alternativesRes.rows);
      console.log(alternatives);
      randQuizzes.push({
        quiz,
        alternatives
      });
      indexes.splice(randIndex, 1);
    }
    console.log(randQuizzes);
    
    return randQuizzes;
  } catch (error) {
    console.error(error.message);
  }
}

exports.getRandomQuizzes = getRandomQuizzes;