/* =====================================
   OUR LITTLE UNIVERSE
   Interactive Surprise Engine
===================================== */

let celebrationStarted = false;
let noAttempts = 0;

/* =====================================
   FLOATING HEARTS
===================================== */

function createFloatingHeart() {

  const heart = document.createElement("div");

  heart.className = "floating-heart";

  const symbols = ["❤️", "💕", "💗", "💖", "✨"];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize =
    (15 + Math.random() * 25) + "px";

  heart.style.animationDuration =
    (4 + Math.random() * 4) + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8500);

}

/* =====================================
   HEART CELEBRATION
===================================== */

let heartInterval = null;

function startHeartCelebration() {

  if (heartInterval) return;

  heartInterval = setInterval(() => {
    createFloatingHeart();
  }, 350);

}

function stopHeartCelebration() {

  clearInterval(heartInterval);

  heartInterval = null;

}

/* =====================================
   CAKE SURPRISE
===================================== */

function initializeCake() {

  const cake = document.getElementById("cakeTap");
  const message = document.getElementById("cakeMessage");

  if (!cake) return;

  cake.addEventListener("click", () => {

    if (cake.dataset.completed === "true") return;

    cake.dataset.completed = "true";

    cake.classList.add("celebrate");

    if (message) {
      message.textContent = CONFIG.cakeMessage;
    }

    // Start music after her interaction
    if (typeof startBirthdayMusic === "function") {
      startBirthdayMusic();
    }

    startHeartCelebration();

    // Continue to birthday greeting
    setTimeout(() => {

      stopHeartCelebration();

      showScreen("welcome");

    }, 3500);

  });

}

/* =====================================
   PLAYFUL NO BUTTON
===================================== */

function initializeQuestion() {

  const noButton = document.getElementById("noButton");
  const yesButton = document.getElementById("yesButton");

  const answerMessage =
    document.getElementById("answerMessage");

  if (!noButton || !yesButton) return;

  noButton.addEventListener("pointerenter", dodgeNoButton);

  noButton.addEventListener("click", dodgeNoButton);

  noButton.addEventListener("touchstart", event => {
    event.preventDefault();
    dodgeNoButton();
  }, { passive: false });

  yesButton.addEventListener("click", () => {

    if (answerMessage) {
      answerMessage.textContent =
        "YAYYYY! You just made my universe brighter! ❤️";
    }

    yesButton.textContent = "YESSS! ❤️";

    startHeartCelebration();

    setTimeout(() => {
      stopHeartCelebration();
      showScreen("finale");
    }, 1800);

  });

}

/* Move and shrink NO button */

function dodgeNoButton() {

  const noButton = document.getElementById("noButton");
  const yesButton = document.getElementById("yesButton");

  if (!noButton || !yesButton) return;

  noAttempts++;

  const scale = Math.max(0.15, 1 - noAttempts * 0.13);

  noButton.style.transform =
    `scale(${scale}) rotate(${Math.random() * 30 - 15}deg)`;

  // Move the button to a new position
  const maxX = Math.min(window.innerWidth * 0.35, 130);
  const maxY = Math.min(window.innerHeight * 0.2, 90);

  const x = Math.random() * maxX * 2 - maxX;
  const y = Math.random() * maxY * 2 - maxY;

  noButton.style.position = "relative";
  noButton.style.left = x + "px";
  noButton.style.top = y + "px";

  // YES becomes bigger
  const yesScale = Math.min(1.8, 1 + noAttempts * 0.12);

  yesButton.style.transform = `scale(${yesScale})`;

  if (noAttempts >= 7) {

    noButton.style.opacity = "0";
    noButton.style.pointerEvents = "none";

    setTimeout(() => {
      noButton.style.display = "none";
    }, 300);

  }

}

/* =====================================
   FINAL CELEBRATION
===================================== */

function launchFinalCelebration() {

  if (celebrationStarted) return;

  celebrationStarted = true;

  startHeartCelebration();

  // Create extra hearts for the final reveal
  for (let i = 0; i < 20; i++) {
    setTimeout(createFloatingHeart, i * 120);
  }

}

/* =====================================
   RESET EXPERIENCE
===================================== */

function resetExperience() {

  celebrationStarted = false;

  noAttempts = 0;

  stopHeartCelebration();

  resetReasons();

  resetLetter();

  const noButton = document.getElementById("noButton");
  const yesButton = document.getElementById("yesButton");

  if (noButton) {

    noButton.style.display = "";
    noButton.style.opacity = "1";
    noButton.style.pointerEvents = "";
    noButton.style.position = "";
    noButton.style.left = "";
    noButton.style.top = "";
    noButton.style.transform = "";

  }

  if (yesButton) {
    yesButton.style.transform = "";
    yesButton.textContent = "YES! ❤️";
  }

  const answerMessage =
    document.getElementById("answerMessage");

  if (answerMessage) {
    answerMessage.textContent = "";
  }

  const cake = document.getElementById("cakeTap");

  if (cake) {
    cake.dataset.completed = "false";
    cake.classList.remove("celebrate");
  }

  const cakeMessage =
    document.getElementById("cakeMessage");

  if (cakeMessage) {
    cakeMessage.textContent = "";
  }

}

/* =====================================
   INITIALIZE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  initializeCake();

  initializeQuestion();

});
