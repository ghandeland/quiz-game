const {getRandomQuizzes} = require("../src/quizzes");

test("Test invalid n", () => {
    
    expect(() => getRandomQuizzes(-1)).toThrow();
    
    
}) 