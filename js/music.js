
const birthdayAudio = document.getElementById("birthdayMusic");

let musicStarted = false;

function startBirthdayMusic() {
  if (!birthdayAudio) {
    console.error("Birthday audio element not found.");
    return;
  }

  birthdayAudio.volume = 0.8;

  // Call play directly from the cake tap interaction.
  const playPromise = birthdayAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        musicStarted = true;
        console.log("Birthday music started!");
      })
      .catch(error => {
        musicStarted = false;
        console.error("Music playback failed:", error);
      });
  }
}

function pauseBirthdayMusic() {
  if (birthdayAudio && !birthdayAudio.paused) {
    birthdayAudio.pause();
  }
}

function resumeBirthdayMusic() {
  if (birthdayAudio && birthdayAudio.paused) {
    startBirthdayMusic();
  }
}

function toggleBirthdayMusic() {
  if (!birthdayAudio) return;

  if (birthdayAudio.paused) {
    startBirthdayMusic();
  } else {
    pauseBirthdayMusic();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!birthdayAudio) return;

  // Load the exact GitHub Pages MP3 path.
  birthdayAudio.src = "/Modhu/assets/music.mp3";
  birthdayAudio.load();

  const cake = document.getElementById("cakeTap");

  if (cake) {
    cake.addEventListener("click", startBirthdayMusic);
  }

  // Optional manual music button.
  const musicButton = document.getElementById("musicToggle");

  if (musicButton) {
    musicButton.addEventListener("click", toggleBirthdayMusic);
  }
});
