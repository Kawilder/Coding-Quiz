function getScores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    var liEl = document.createElement("li");
    liEl.textContent = score.initials + " - " + score.score;
    console.log(score.initials + score.score);
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liEl);
  });
}

function clearScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

getScores();