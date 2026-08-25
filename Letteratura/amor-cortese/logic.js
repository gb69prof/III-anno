(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PWA_LOGIC = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  function evaluateQuiz(questions, indices, answers) {
    const results = indices.map(idx => {
      const q = questions[idx];
      const selected = answers[idx];
      return { idx, selected, correct: selected === q.correct, q };
    });
    const correctCount = results.filter(r => r.correct).length;
    const percent = Math.round(correctCount / results.length * 100);
    const grade = Math.max(1, Math.round(percent / 10));
    const wrong = results.filter(r => !r.correct).map(r => r.idx);
    return { results, correctCount, total: results.length, percent, grade, wrong };
  }
  return { evaluateQuiz };
});
