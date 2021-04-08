const express = require("express");
const app = express();
const path = require("path");
require('dotenv');
const https = require('https');
const fs = require('fs');
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { getRandomQuizzes, checkAnswer, quizzes } = require("./quiz");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(
  session({
    secret: "K54Ai7o7iuyQa3z",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

console.log(process.env.GOOGLE_CLIENT_ID);
// Passport / Google / Oauth
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/oauth2callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, { username: profile.emails[0].value });
  }
  )
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((id, done) => done(null, id));
  
  app.get("/api/profile", (req, res) => { 
    if (!req.user) {
      return res.status(401).send();
    }
    const { username } = req.user;
    res.json({ username });
  });
  
  app.post("/api/login", passport.authenticate('google'), (req, res) => {  
    res.end();
  });
  
  
  
  
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

// Post answer and update correctCount if correct
app.post("/api/quiz/answer", (req, res) => {  
  const { qId, aId } = req.body;
  if(checkAnswer(qId, aId)) {
    correctCount++;  
  }
  res.end();
});


// Set up static folder
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const port = process.env.port || 3000;

const server = https
  .createServer(
    {
      key: fs.readFileSync("quizserver.key"),
      cert: fs.readFileSync("quizserver.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log("Started server on port " + port);
  });

// app.listen(port, () => {
//   console.log('Server started on port ' + port);
// })

/* 
Notes:
Edit hosts-file:
127.0.0.1       quizgame.pg6301.no

Command to generate simple self-signed certificate with OpenSSL (terminal):
openssl req -x509 -nodes -keyout quizserver.key -out quizserver.crt -subj "/CN=quizgame.pg6301.no" -addext "subjectAltName = DNS:quizgame.pg6301.no"
*/
