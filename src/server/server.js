const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { getRandomQuizzes, checkAnswer, quizzes } = require("./quiz");
require("dotenv").config();


app.use(
  session({
    secret: "K54Ai7o7iuyQa3z",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

let correctCount = 0;

// Get quizzes with amount parameter
app.get("/api/quiz/start/:amount", (req, res) => {
  correctCount = 0;
  res.json(getRandomQuizzes(req.params.amount));
});

// Get quiz result
app.get("/api/quiz/result", (req, res) => {
  res.json(correctCount);
});

// Get quiz result
app.get("/api/profile", (req, res) => { 
  const { username } = req.session;
  if (!username) {
    console.log("nousername");
    return res.status(401).send();
  }
  res.json({ username });
});

// Post answer and update correctCount if correct
app.post("/api/quiz/answer", (req, res) => {  
  const { qId, aId } = req.body;
  if(checkAnswer(qId, aId)) {
    correctCount++;  
  }
  res.end();
});

// Post login details
app.post("/api/login", (req, res) => {  
  const { username } = req.body;
  req.session.username = username;
  res.end();
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
