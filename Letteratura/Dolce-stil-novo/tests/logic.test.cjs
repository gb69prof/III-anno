const assert = require("node:assert/strict");
const { evaluateQuiz } = require("../logic.js");

const questions = [
  {correct:"A"}, {correct:"B"}, {correct:"C"}, {correct:"A"}
];

let result = evaluateQuiz(questions,[0,1,2,3],{0:"A",1:"B",2:"C",3:"A"});
assert.equal(result.correctCount,4);
assert.equal(result.percent,100);
assert.equal(result.grade,10);
assert.deepEqual(result.wrong,[]);

result = evaluateQuiz(questions,[0,1,2,3],{0:"A",1:"A",2:"C",3:"B"});
assert.equal(result.correctCount,2);
assert.equal(result.percent,50);
assert.equal(result.grade,5);
assert.deepEqual(result.wrong,[1,3]);

result = evaluateQuiz(questions,[0,1,2],{0:"A",1:"A",2:"C"});
assert.equal(result.percent,67);
assert.equal(result.grade,6.7);
assert.deepEqual(result.wrong,[1]);

result = evaluateQuiz(questions,[0],{0:"B"});
assert.equal(result.grade,1);

console.log("logic.test.cjs: ok");
