const enCours = [
  { titre: "The Body Keeps the Score", auteur: "Bessel van der Kolk", pages: 464, lu: 200, cover: "assets/img/livres/the-body-keeps-the-score.jpg" },
  { titre: "The Animator's Survival Kit", auteur: "Richard Williams", pages: 382, lu: 100, cover: "assets/img/livres/technique-animation.jpg" },
  { titre: "Bury Our Bones in the Midnight Soil", auteur: "V.E. Schwab", pages: 352, lu: 50, cover: "assets/img/livres/bury-our-bones.jpg" },
];

const lusListe = [
  { titre: "Changer l'eau des fleurs", auteur: "Valérie Perrin", cover: "assets/img/livres/changer-eau-fleurs.jpg" },
  { titre: "Brutally Honest", auteur: "Mel B", cover: "assets/img/livres/brutally-honest.jpg" },
  { titre: "L'Arabe du futur", auteur: "Riad Sattouf", cover: "assets/img/livres/arabe-du-futur.jpg" },
  { titre: "Elle s'appelait Sarah", auteur: "Tatiana de Rosnay", cover: "assets/img/livres/elle-sappellait-sarah.jpg" },
  { titre: "Flowers for Algernon", auteur: "Daniel Keyes", cover: "assets/img/livres/fleurs-pour-algernon.jpg" },
  { titre: "I'm Glad My Mom Died", auteur: "Jennette McCurdy", cover: "assets/img/livres/glad-my-mom-died.jpg" },
  { titre: "The Hadmaid's tale", auteur: "Margaret Wood", cover: "assets/img/livres/handmaids-tale.jpg" },
  { titre: "Normal people", auteur: "Sarah Rooney", cover: "assets/img/livres/normal-people.jpg" },
  { titre: "La vie invisible d'Addie Larue", auteur: "V.E. Schwab", cover: "assets/img/livres/addie-larue.jpg" },
];

const tagReading       = document.getElementById("tag-reading");
const bibOverlay       = document.getElementById("bib-overlay");
const bibClose         = document.getElementById("bib-close");
const bibEnCours       = document.getElementById("bib-en-cours");
const bibLus           = document.getElementById("bib-lus");
const bibLightbox      = document.getElementById("bib-lightbox");
const bibLightboxImg   = document.getElementById("bib-lightbox-img");
const bibLightboxClose = document.getElementById("bib-lightbox-close");

/*  livres EN COURS */

function buildEnCours() {
  enCours.forEach((livre) => {
    const pct = Math.round((livre.lu / livre.pages) * 100);

    const card = document.createElement("div");
    card.className = "bib-encours-card";

    card.innerHTML = `
      <div class="bib-encours-cover">
        ${livre.cover
          ? `<img src="${livre.cover}" alt="${livre.titre}" loading="lazy"/>`
          : `<div class="bib-cover-placeholder">${livre.titre[0]}</div>`
        }
      </div>
      <div class="bib-encours-info">
        <div class="bib-encours-titre">${livre.titre}</div>
        <div class="bib-encours-auteur">${livre.auteur}</div>
        <div class="bib-jauge-wrap">
          <div class="bib-jauge-bar">
            <div class="bib-jauge-fill" style="width: ${pct}%"></div>
          </div>
          <span class="bib-jauge-pct">${pct}%</span>
        </div>
        <div class="bib-pages">${livre.lu} / ${livre.pages} pages</div>
      </div>
    `;

    bibEnCours.appendChild(card);
  });
}

/* livres LUS */
function buildLus() {
  lusListe.forEach((livre) => {
    const item = document.createElement("div");
    item.className = "bib-lu-item";

    if (livre.cover) {
      const img = document.createElement("img");
      img.src = livre.cover;
      img.alt = livre.titre;
      img.loading = "lazy";
      item.appendChild(img);
      item.addEventListener("click", () => openBibLightbox(livre.cover, livre.titre));
    } else {
      item.innerHTML = `<div class="bib-cover-placeholder">${livre.titre[0]}</div>`;
    }

    bibLus.appendChild(item);
  });
}

/* LIGHTBOX */
function openBibLightbox(src, titre) {
  bibLightboxImg.src = src;
  bibLightboxImg.alt = titre;
  bibLightbox.classList.add("open");
}

function closeBibLightbox() {
  bibLightbox.classList.remove("open");
}

bibLightboxClose.addEventListener("click", closeBibLightbox);
bibLightbox.addEventListener("click", (e) => {
  if (e.target === bibLightbox) closeBibLightbox();
});

/* OUVERTURE FERMETURE */
function openBib() {
  bibOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBib() {
  bibOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

tagReading.addEventListener("click", openBib);
bibClose.addEventListener("click", closeBib);
bibOverlay.addEventListener("click", (e) => {
  if (e.target === bibOverlay) closeBib();
});

document.addEventListener("keydown", (e) => {
  if (bibLightbox.classList.contains("open") && e.key === "Escape") closeBibLightbox();
  if (bibOverlay.classList.contains("open") && e.key === "Escape") closeBib();
});

buildEnCours();
buildLus();