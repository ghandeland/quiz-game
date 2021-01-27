const {getRandomQuizzes} = require("../src/quizzes");

test("Test invalid n", () => {
    
    expect(() => getRandomQuizzes(-1)).toThrow();
    expect(() => getRandomQuizzes(0)).toThrow();
    expect(() => getRandomQuizzes(99999)).toThrow();
}) 

