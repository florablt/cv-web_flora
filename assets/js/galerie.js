
const dessins = [
  "assets/img/dessins/aurelia-flora.jpg",
  "assets/img/dessins/michaela_coel.jpeg",
  "assets/img/dessins/pascal.jpg",
  "assets/img/dessins/zendaya-croquis.jpeg",
  "assets/img/dessins/zendaya-aquarelle.jpeg",
  "assets/img/dessins/sadie-sink.jpeg",
  "assets/img/dessins/villanelle.jpeg",
  "assets/img/dessins/villanelle-2.jpeg",
  "assets/img/dessins/vaness-paradis.jpeg",
  "assets/img/dessins/hand-gun.jpeg",
  "assets/img/dessins/julie-feelou.jpg",
  "assets/img/dessins/moonbyul-acrylique.jpeg",
  "assets/img/dessins/poney-pastel.jpg",
  "assets/img/dessins/ponyo-feutres.jpeg",
  "assets/img/dessins/grenouille.jpeg",
];

/* ÉLÉMENTS DU DOM */
const tagDrawing      = document.getElementById("tag-drawing");
const galerieOverlay  = document.getElementById("galerie-overlay");
const galerieClose    = document.getElementById("galerie-close");
const galerieGrid     = document.getElementById("galerie-grid");
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxImg     = document.getElementById("lightbox-img");
const lightboxClose   = document.getElementById("lightbox-close");
const lightboxPrev    = document.getElementById("lightbox-prev");
const lightboxNext    = document.getElementById("lightbox-next");

let currentIndex = 0;

/* LA GRILLE */
dessins.forEach((src, i) => {
  const item = document.createElement("div");
  item.className = "galerie-item";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Dessin ${i + 1}`;
  img.loading = "lazy"; 

  item.appendChild(img);
  item.addEventListener("click", () => openLightbox(i));
  galerieGrid.appendChild(item);
});

/* OUVERTURE FERMETURE GALERIE */
function openGalerie() {
  galerieOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; 
}

function closeGalerie() {
  galerieOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

tagDrawing.addEventListener("click", openGalerie);
galerieClose.addEventListener("click", closeGalerie);

galerieOverlay.addEventListener("click", (e) => {
  if (e.target === galerieOverlay) closeGalerie();
});

/* LIGHTBOX */
function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = dessins[currentIndex];
  lightboxOverlay.classList.add("open");
}

function closeLightbox() {
  lightboxOverlay.classList.remove("open");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + dessins.length) % dessins.length;
  lightboxImg.src = dessins[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % dessins.length;
  lightboxImg.src = dessins[currentIndex];
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrev);
lightboxNext.addEventListener("click", showNext);

lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});

// Navigation clavier 
document.addEventListener("keydown", (e) => {
  if (lightboxOverlay.classList.contains("open")) {
    if (e.key === "ArrowLeft")  showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape")     closeLightbox();
  }
  if (galerieOverlay.classList.contains("open")) {
    if (e.key === "Escape") closeGalerie();
  }
});
