const express = require('express');
const app = express()
const path = require('path');
const quizzes = require('./quiz');

const testobj = {
    val1: 123,
    val2: ['a', 'b', 'c']
}

app.get("/api/quiz", (req, res) => {
    res.json(quizzes);
})



// Set up static folder
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));


app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});




const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Started server on port " + port);
})