
/* =====================================
   OUR LITTLE UNIVERSE
   100 Reasons Engine
===================================== */

let currentReasonIndex = 0;

/* Display a reason */

function displayReason() {

  const numberElement = document.getElementById("reasonNumber");
  const textElement = document.getElementById("reasonText");

  if (!numberElement || !textElement) return;

  const totalReasons = CONFIG.reasons.length;

  const reason = CONFIG.reasons[currentReasonIndex];

  numberElement.textContent =
    `${String(currentReasonIndex + 1).padStart(2, "0")} / ${totalReasons}`;

  // Restart animation
  textElement.style.animation = "none";
  void textElement.offsetWidth;
  textElement.style.animation = "reasonReveal 0.5s ease";

  textElement.textContent = reason;

}

/* Next reason */

function nextReason() {

  if (currentReasonIndex < CONFIG.reasons.length - 1) {

    currentReasonIndex++;

    displayReason();

  } else {

    showReasonsComplete();

  }

}

/* Previous reason */

function previousReason() {

  if (currentReasonIndex > 0) {

    currentReasonIndex--;

    displayReason();

  }

}

/* End message */

function showReasonsComplete() {

  const numberElement = document.getElementById("reasonNumber");
  const textElement = document.getElementById("reasonText");

  if (!numberElement || !textElement) return;

  numberElement.textContent = "100 / 100 ❤️";

  textElement.textContent =
    "100 reasons, one heart, and an infinite number of reasons still waiting to be discovered. I LOVE YOU, AMMADU!";

}

/* Reset reasons */

function resetReasons() {

  currentReasonIndex = 0;

  displayReason();

}

/* Connect buttons */

document.addEventListener("DOMContentLoaded", () => {

  const nextButton = document.getElementById("nextReason");
  const previousButton = document.getElementById("prevReason");

  if (nextButton) {
    nextButton.addEventListener("click", nextReason);
  }

  if (previousButton) {
    previousButton.addEventListener("click", previousReason);
  }

  displayReason();

});
    
