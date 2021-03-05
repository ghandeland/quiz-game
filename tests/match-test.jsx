const React = require('react');
const { mount } = require('enzyme');
const { match, Match } = require("../src/client/match");
const { getRandomQuizzes } = require('../src/client/quizzes');
const { quizzes } = require("../src/client/quizzes");

function checkDisplayedQuiz(driver) {
   
    const container = driver.find(".quiz-container");
    expect(container.length).toEqual(1);
  
    const question = driver.find('.question')
    expect(question.length).toEqual(1);
    
    const buttons = driver.find('.button')
    expect(buttons.length).toEqual(4)
};

function getDisplayedQuiz(driver) {
  const quizDiv = driver.find(".quiz-container").at(0);
  const html_id = quizDiv.prop("id");
  const id = parseInt(html_id.substring("quiz-id-".length, html_id.length));

  const quiz = quizzes.find((e) => e.id === id);
  return quiz;
}

test("testRenderQuiz", () => {
    const driver = mount(<Match/>)
    checkDisplayedQuiz(driver)
});

test("Test do answer correctly", () => {
  const driver = mount(<Match />);
  checkDisplayedQuiz(driver);
  
  const quiz = getDisplayedQuiz(driver);
  const correct = quiz.correct;

  const first = driver.find('.button').at(correct);
  first.simulate("click");
  
  const gameOver = driver.html().includes("over");
  experiments(gameOver).toEqual(false);
  
  checkDisplayedQuiz(driver);
  const newQuiz = getDisplayedQuiz(driver);
  const newQuizIdIsSameAsOld = newQuiz.id === id;
  expect(newQuizIdIsSameAsOld).toEqual(false);
});
