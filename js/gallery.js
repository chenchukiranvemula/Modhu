
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item img");

  images.forEach((img, index) => {
    const photoNumber = index + 1;

    img.src = `/Modhu/assets/photos/photo${photoNumber}.jpg`;
    img.loading = "lazy";
    img.alt = `Our special memory ${photoNumber}`;

    img.addEventListener("error", () => {
      console.error(`Could not load photo${photoNumber}.jpg`);
      img.alt = `Photo ${photoNumber} could not be loaded`;
    });

    img.addEventListener("click", () => {
      openPhotoViewer(img.src, img.alt);
    });
  });

  // Create photo viewer
  const viewer = document.createElement("div");
  viewer.id = "photoViewer";

  viewer.innerHTML = `
    <button id="closePhotoViewer" aria-label="Close">×</button>
    <img id="viewerImage" src="" alt="">
    <p id="viewerCaption"></p>
  `;

  document.body.appendChild(viewer);

  const closeButton = document.getElementById("closePhotoViewer");

  function closeViewer() {
    viewer.classList.remove("visible");
  }

  closeButton.addEventListener("click", closeViewer);

  viewer.addEventListener("click", event => {
    if (event.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeViewer();
  });

  window.openPhotoViewer = function(src, caption) {
    document.getElementById("viewerImage").src = src;
    document.getElementById("viewerCaption").textContent = caption;
    viewer.classList.add("visible");
  };
});
