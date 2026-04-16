/* TYPEWRITER NAME */


const name = "Flora Boulet";
const target = document.querySelector(".name-banner h1");

if (target) {
  target.textContent = "";

  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      target.textContent += name[i];
      i++;
      if (i >= name.length) clearInterval(interval);
    }, 80); // 80ms entre chaque lettre
  }, 1000);
}

/* COPIE AU CLIC (infos contact) */
const toast = document.createElement("div");
toast.id = "toast";
toast.textContent = "Copié !";
document.body.appendChild(toast);

// Style du message copié
const toastStyle = document.createElement("style");
toastStyle.textContent = `
  #toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(201, 99, 122, 0.9);
    color: #fff;
    padding: 8px 20px;
    border-radius: 999px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
    z-index: 999;
  }
  #toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;
document.head.appendChild(toastStyle);

// afficher le toast
function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// copier
function copyText(text) {
  navigator.clipboard.writeText(text).then(showToast);
}

// cible les liens email et téléphone
const email = document.querySelector('a[href^="mailto:"]');
const tel   = document.querySelector('a[href^="tel:"]');

if (email) {
  email.addEventListener("click", (e) => {
    e.preventDefault(); 
    copyText(email.textContent.trim());
  });
}

if (tel) {
  tel.addEventListener("click", (e) => {
    e.preventDefault(); 
    copyText(tel.textContent.trim());
  });
}
