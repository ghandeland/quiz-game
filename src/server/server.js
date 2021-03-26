const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { getRandomQuizzes, checkAnswer, quizzes } = require("./quiz");

let correctCount = 0;

app.use(bodyParser.json());

// Get quizzes with amount parameter
app.get("/api/quiz/start/:amount", (req, res) => {
  res.json(getRandomQuizzes(req.params.amount));
});

// Get quiz result
app.get("/api/quiz/result", (req, res) => {
  res.json(correctCount);
});

// Post answer and update correctCount if correct
app.post("/api/quiz/answer", (req, res) => {  
  const { qId, aId } = req.body;
  if(checkAnswer(qId, aId)) {
    correctCount++;  
  }
});

// Set up static folder
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("Started server on port " + port);
});
