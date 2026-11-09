
document.addEventListener("DOMContentLoaded", () => {
  // Create the animated star background
  createStarBackground();

  // Load birthday content from config.js
  loadBirthdayContent();

  // Show the intro screen when the website opens
  showScreen("intro");

  // Recreate stars when the screen size changes
  window.addEventListener("resize", () => {
    createStarBackground();
  });

  // Pause music when the visitor leaves the page
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseBirthdayMusic();
    }
  });

  console.log("OUR LITTLE UNIVERSE ❤️ is ready!");
});


// Create background stars
function createStarBackground() {
  const starsContainer = document.getElementById("stars");

  if (!starsContainer) return;

  starsContainer.innerHTML = "";

  const starCount = window.innerWidth < 600 ? 70 : 120;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    starsContainer.appendChild(star);
  }
}


// Load personalized birthday content
function loadBirthdayContent() {
  const nameElements = document.querySelectorAll(".girlfriend-name");

  nameElements.forEach(element => {
    element.textContent = CONFIG.name;
  });

  const titleElement = document.getElementById("birthdayTitle");

  if (titleElement) {
    titleElement.textContent = CONFIG.title;
  }

  const messageElement = document.getElementById("birthdayMessage");

  if (messageElement) {
    messageElement.textContent = CONFIG.birthdayMessage;
  }

  const cakeMessageElement = document.getElementById("cakeMessage");

  if (cakeMessageElement) {
    cakeMessageElement.textContent = CONFIG.cakeMessage;
  }
    }
