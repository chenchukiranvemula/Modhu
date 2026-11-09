
let discoveredReasons = new Set();

function initializeReasons() {
  const container = document.getElementById("reasonBubbles");
  const popup = document.getElementById("reasonPopup");
  const popupText = document.getElementById("popupReasonText");
  const closeButton = document.getElementById("closeReasonPopup");
  const progress = document.getElementById("bubbleProgress");

  if (!container || !popup || !popupText) return;

  container.innerHTML = "";
  discoveredReasons.clear();

  CONFIG.reasons.forEach((reason, index) => {
    const bubble = document.createElement("button");

    bubble.className = "reason-bubble";
    bubble.type = "button";
    bubble.textContent = "💗";
    bubble.setAttribute("aria-label", `Discover reason ${index + 1}`);

    bubble.addEventListener("click", () => {
      if (discoveredReasons.has(index)) return;

      discoveredReasons.add(index);
      popupText.textContent = reason;
      popup.classList.add("active");

      bubble.classList.add("popped");

      progress.textContent =
        `${discoveredReasons.size} / ${CONFIG.reasons.length} bubbles discovered`;
    });

    container.appendChild(bubble);
  });

  function closePopup() {
    popup.classList.remove("active");
  }

  closeButton?.addEventListener("click", closePopup);

  popup.addEventListener("click", event => {
    if (event.target === popup) closePopup();
  });
}

document.addEventListener("DOMContentLoaded", initializeReasons);
