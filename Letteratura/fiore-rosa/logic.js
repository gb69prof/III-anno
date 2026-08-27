(function () {
  const letters = ["A", "B", "C", "D"];
  window.PWA_LOGIC = {
    grade(answer, correct) { return answer === correct; },
    letter(index) { return letters[index] || ""; },
    percent(score, total) { return total ? Math.round((score / total) * 100) : 0; },
    normalize(value) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  };
}());
