(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ContrastoLogic = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function grade(correct, total) {
    const percentage = total ? Math.round((correct / total) * 100) : 0;
    const vote = Math.max(1, Math.round((percentage / 100) * 10));
    return { correct, total, percentage, vote };
  }

  function evaluate(questions, answers) {
    const wrong = [];
    let correct = 0;
    questions.forEach((question, index) => {
      const selected = Number(answers[index]);
      const expected = Number(question.a);
      if (selected === expected) correct += 1;
      else wrong.push({ index, selected, expected, question });
    });
    return { ...grade(correct, questions.length), wrong };
  }

  function selectWrong(questions, result) {
    return result.wrong.map((item) => questions[item.index]);
  }

  return { grade, evaluate, selectWrong };
});
