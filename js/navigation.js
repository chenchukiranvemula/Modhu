
/* =====================================
   OUR LITTLE UNIVERSE
   Screen Navigation Engine
===================================== */

const SCREEN_ORDER = [
  "intro",
  "cake",
  "welcome",
  "reasons",
  "gallery",
  "letter",
  "question",
  "finale"
];

let currentScreen = "intro";

/* Show a screen */

function showScreen(screenId) {

  const target = document.getElementById(screenId);

  if (!target) {
    console.error("Screen not found:", screenId);
    return;
  }

  // Hide all screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // Show selected screen
  target.classList.add("active");

  currentScreen = screenId;

  // Reset scroll position
  target.scrollTop = 0;

  // Trigger screen-specific actions
  if (screenId === "letter" && typeof startLetter === "function") {
    startLetter();
  }

  if (screenId === "finale" && typeof launchFinalCelebration === "function") {
    launchFinalCelebration();
  }
}

/* Go to next screen */

function nextScreen() {

  const currentIndex = SCREEN_ORDER.indexOf(currentScreen);

  if (currentIndex === -1) return;

  const nextIndex = currentIndex + 1;

  if (nextIndex < SCREEN_ORDER.length) {
    showScreen(SCREEN_ORDER[nextIndex]);
  }
}

/* Go to previous screen */

function previousScreen() {

  const currentIndex = SCREEN_ORDER.indexOf(currentScreen);

  if (currentIndex <= 0) return;

  showScreen(SCREEN_ORDER[currentIndex - 1]);
}

/* Buttons with data-next */

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".next-screen").forEach(button => {

    button.addEventListener("click", () => {

      const destination = button.dataset.next;

      if (destination) {
        showScreen(destination);
      }

    });

  });

  // Start journey button
  const startButton = document.getElementById("startJourney");

  if (startButton) {
    startButton.addEventListener("click", () => {
      showScreen("cake");
    });
  }

  // Replay entire experience
  const replayButton = document.getElementById("replayButton");

  if (replayButton) {
    replayButton.addEventListener("click", () => {
      showScreen("intro");

      // Reset celebration state
      if (typeof resetExperience === "function") {
        resetExperience();
      }
    });
  }

});
    
