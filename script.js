var sm = (function () {
  var tMax = 3000, // animation time, ms
    height = 310,
    speeds = [],
    r = [],
    reels = [
      ["National", "International", "US", "American", "NorthAmerican"],
      ["Elite", "Premier", "Select", "Prime", "Competitive"],
      ["Club", "Club Soccer", "Football", "Soccer", "Futbol"],
      ["Acadmy", "Pathway", "Association", "Association", "league"],
    ],
    $reels,
    $msg,
    start;

  function shufReels() {
    for (var i = 0; i < 3; i++) {
      reels[i] = reels[i].slice().sort(function () {
        return 0.5 - Math.random();
      });
    }
  }

  function shuffleReels() {
    reels = reels.slice().sort(function () {
      return 0.5 - Math.random();
    });
  }
  function init() {
    shuffleReels();
    shufReels(); // Shuffle reels 1-3 on init
    $reels = document.querySelectorAll(".reel");
    $reels.forEach(function (reel, index) {
      reel.innerHTML =
        "<div><p>" +
        reels[index].join("</p> <p>") +
        "</p></div><div><p>" +
        reels[index].join("</p><p>") +
        "</p></div>";
    });

    $msg = document.querySelector(".msg");

    document.querySelector("button").addEventListener("click", action);
  }

  function action() {
    if (start !== undefined) return;

    for (var i = 0; i < 4; ++i) {
      speeds[i] = Math.random() + 0.5;
      r[i] = (((Math.random() * 4) | 0) * height) / 5;
    }

    $msg.innerHTML = "Spinning...";
    animate();
  }
  function animate(now) {
    if (!start) start = now;
    var t = now - start || 0;

    for (var i = 0; i < 4; ++i) {
      // Calculate the index of the currently visible word
      var index = Math.floor(
        ((speeds[i] / tMax / 2) * (tMax - t) * (tMax - t) + r[i]) / (height / 5)
      );

      // Set the scroll position to display only one word
      $reels[i].scrollTop = index * (height / 5);

      // Update the r[3] variable
      if (i === 3) {
        r[i] = index * (height / 5);
      }
    }

    if (t < tMax) {
      requestAnimationFrame(animate);
    } else {
      start = undefined;
      check();
    }
  }
  function check() {
    // Set the scroll position of the fourth reel to the index of "Association"
    $reels[3].scrollTop = reels[3].indexOf("Association") * (height / 5);

    // Display the result
    var msg = "";
    msg += "<p>" + "Results of your spin" + "</p>";
    $msg.innerHTML = msg;
  }

  return { init: init };
})();

sm.init();
