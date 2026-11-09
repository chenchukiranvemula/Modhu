
/* =====================================
   OUR LITTLE UNIVERSE
   Music Player Engine
===================================== */

const MUSIC_SETTINGS = {
  volume: 0.65,
  fadeDuration: 2500
};

let musicStarted = false;
let fadeTimer = null;

/* Get audio element */

function getBirthdayMusic() {
  return document.getElementById("birthdayMusic");
}

/* Start birthday music */

function startBirthdayMusic() {

  const audio = getBirthdayMusic();

  if (!audio) return;

  // Avoid restarting music unnecessarily
  if (!audio.paused) return;

  audio.volume = 0;
  audio.play().then(() => {

    musicStarted = true;
    fadeInMusic();

  }).catch(error => {

    console.warn(
      "Music playback was blocked or the audio file is missing:",
      error
    );

  });

}

/* Smooth fade-in */

function fadeInMusic() {

  const audio = getBirthdayMusic();

  if (!audio) return;

  clearInterval(fadeTimer);

  const steps = 25;
  const interval = MUSIC_SETTINGS.fadeDuration / steps;
  let currentStep = 0;

  fadeTimer = setInterval(() => {

    currentStep++;

    audio.volume = Math.min(
      MUSIC_SETTINGS.volume,
      (MUSIC_SETTINGS.volume * currentStep) / steps
    );

    if (currentStep >= steps) {
      clearInterval(fadeTimer);
      audio.volume = MUSIC_SETTINGS.volume;
    }

  }, interval);

}

/* Pause music */

function pauseBirthdayMusic() {

  const audio = getBirthdayMusic();

  if (!audio) return;

  audio.pause();
}

/* Resume music */

function resumeBirthdayMusic() {

  const audio = getBirthdayMusic();

  if (!audio) return;

  if (audio.paused) {
    startBirthdayMusic();
  }
}

/* Toggle music */

function toggleBirthdayMusic() {

  const audio = getBirthdayMusic();

  if (!audio) return;

  if (audio.paused) {
    startBirthdayMusic();
  } else {
    pauseBirthdayMusic();
  }

}

/* Change volume */

function setBirthdayVolume(value) {

  const audio = getBirthdayMusic();

  if (!audio) return;

  const volume = Number(value);

  if (!Number.isFinite(volume)) return;

  audio.volume = Math.max(0, Math.min(1, volume));

}

/* Start music when cake is tapped */

document.addEventListener("DOMContentLoaded", () => {

  const cake = document.getElementById("cakeTap");

  if (!cake) return;

  cake.addEventListener("click", () => {

    startBirthdayMusic();

  });

});
  
