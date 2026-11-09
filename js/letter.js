
/* =====================================
   OUR LITTLE UNIVERSE
   Romantic Typewriter Letter
===================================== */

let letterTimer = null;
let letterStarted = false;

/* Start typing animation */

function startLetter() {

  const letterElement = document.getElementById("typedLetter");

  if (!letterElement) return;

  // Don't restart if already completed
  if (letterStarted) return;

  letterStarted = true;

  clearInterval(letterTimer);

  const message = CONFIG.letter;

  let characterIndex = 0;

  letterElement.textContent = "";

  const typingSpeed = 35;

  letterTimer = setInterval(() => {

    if (characterIndex < message.length) {

      letterElement.textContent += message.charAt(characterIndex);

      characterIndex++;

    } else {

      clearInterval(letterTimer);

      letterElement.textContent = message;

    }

  }, typingSpeed);

}

/* Reset letter */

function resetLetter() {

  clearInterval(letterTimer);

  letterTimer = null;

  letterStarted = false;

  const letterElement = document.getElementById("typedLetter");

  if (letterElement) {
    letterElement.textContent = "";
  }

}

/* Complete letter immediately */

function completeLetter() {

  clearInterval(letterTimer);

  const letterElement = document.getElementById("typedLetter");

  if (letterElement) {
    letterElement.textContent = CONFIG.letter;
  }

  letterStarted = true;

}
