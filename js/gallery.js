
/* =====================================
   OUR LITTLE UNIVERSE
   Photo Gallery Engine
===================================== */

let galleryImages = [];
let currentPhotoIndex = 0;

/* Collect gallery images */

function initializeGallery() {

  const images = document.querySelectorAll(".photo-card img");

  galleryImages = Array.from(images).map((image, index) => ({
    src: image.src,
    alt: image.alt,
    caption: CONFIG.galleryCaptions[index] || "A beautiful memory ❤️"
  }));

  images.forEach((image, index) => {

    image.style.cursor = "pointer";

    image.addEventListener("click", () => {
      openPhoto(index);
    });

  });

}

/* Create image viewer */

function createGalleryViewer() {

  if (document.getElementById("galleryViewer")) return;

  const viewer = document.createElement("div");

  viewer.id = "galleryViewer";

  viewer.innerHTML = `
    <button class="gallery-close" aria-label="Close gallery">&times;</button>

    <button class="gallery-arrow gallery-prev" aria-label="Previous photo">
      &#10094;
    </button>

    <div class="gallery-preview">
      <img id="previewImage" src="" alt="Memory preview">
      <p id="previewCaption"></p>
      <span id="previewCounter"></span>
    </div>

    <button class="gallery-arrow gallery-next" aria-label="Next photo">
      &#10095;
    </button>
  `;

  document.body.appendChild(viewer);

  viewer.querySelector(".gallery-close").addEventListener("click", closePhoto);

  viewer.querySelector(".gallery-prev").addEventListener("click", () => {
    changePhoto(-1);
  });

  viewer.querySelector(".gallery-next").addEventListener("click", () => {
    changePhoto(1);
  });

  viewer.addEventListener("click", event => {
    if (event.target === viewer) {
      closePhoto();
    }
  });

  document.addEventListener("keydown", event => {

    if (!viewer.classList.contains("visible")) return;

    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") changePhoto(-1);
    if (event.key === "ArrowRight") changePhoto(1);

  });

}

/* Open photo */

function openPhoto(index) {

  if (!galleryImages.length) return;

  createGalleryViewer();

  currentPhotoIndex = index;

  updatePhotoViewer();

  document.getElementById("galleryViewer").classList.add("visible");

}

/* Update preview */

function updatePhotoViewer() {

  const photo = galleryImages[currentPhotoIndex];

  document.getElementById("previewImage").src = photo.src;

  document.getElementById("previewImage").alt = photo.alt;

  document.getElementById("previewCaption").textContent = photo.caption;

  document.getElementById("previewCounter").textContent =
    `${currentPhotoIndex + 1} / ${galleryImages.length}`;

}

/* Change image */

function changePhoto(direction) {

  currentPhotoIndex =
    (currentPhotoIndex + direction + galleryImages.length) %
    galleryImages.length;

  updatePhotoViewer();

}

/* Close viewer */

function closePhoto() {

  const viewer = document.getElementById("galleryViewer");

  if (viewer) {
    viewer.classList.remove("visible");
  }

}

/* Initialize after page loads */

document.addEventListener("DOMContentLoaded", initializeGallery);
                                                            
