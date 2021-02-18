const React = require('react');
const { mount } = require('enzyme');
const { match, Match } = require("../src/match");

function checkDisplayedQuiz(driver) {
   
    const question = driver.find('.question')
    
    expect(question.length).toEqual(1);
    
    const buttons = driver.find('.button')
    
    expect(buttons.length).toEqual(4)
};

test("testRenderQuiz", () => {
    const driver = mount(<Match/>)
    checkDisplayedQuiz(driver)
});

test("Test do answer", () => {
  const driver = mount(<Match />);

  let msg = undefined;

  global.alert = (s) => {
    msg = s;
  };

  const first = driver.find(".button").at(0);
  first.simulate("click");

  checkDisplayedQuiz(driver);
  expect(msg).toBeDefined();
});
