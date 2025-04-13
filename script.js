// ===============================================
// LOGIKA REDIRECT KE INDEX.HTML SAAT FIRST VISIT
// ===============================================
const currentPath = window.location.pathname;
const isIndex = currentPath.includes("index.html") || currentPath === "/" || currentPath === "/index.html";
const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
const fromIndex = sessionStorage.getItem("fromIndex");
const skipIntro = sessionStorage.getItem("skipIntro");
const targetPage = sessionStorage.getItem("targetPage");

// Jika buka halaman selain index.html dan belum pernah lihat intro
if (!isIndex && !hasSeenIntro && !fromIndex && !skipIntro) {
  // Simpan tujuan halaman sekarang
  sessionStorage.setItem("targetPage", window.location.href);
  // Arahkan ke index.html untuk tampilkan intro
  window.location.href = "index.html";
}

// ===============================================
// DI INDEX.HTML SAAT HALAMAN DIBUKA
// ===============================================
if (isIndex) {
  window.onload = function () {
    const intro = document.querySelector(".intro-container");

    const refreshRedirect = sessionStorage.getItem("refreshRedirect");
    const skipIntro = sessionStorage.getItem("skipIntro");
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    // Jika dari navigasi internal
    if (skipIntro) {
      sessionStorage.removeItem("skipIntro");
      window.location.href = "home.html";
      return;
    }

    // Jika dari refresh dan ingin tampilkan intro ulang
    if (refreshRedirect) {
      if (intro) {
        intro.style.opacity = 1;
        intro.style.transition = "opacity 1s ease";
      }

      setTimeout(() => {
        if (intro) intro.style.opacity = 0;

        setTimeout(() => {
          sessionStorage.removeItem("refreshRedirect");
          window.location.href = "home.html";
        }, 1000); // waktu tunggu setelah fade out
      }, 3500); // durasi intro saat refresh
      return;
    }

    // Intro normal saat pertama kali buka
    if (!hasSeenIntro) {
      if (intro) {
        intro.style.opacity = 1;
        intro.style.transition = "opacity 1s ease";
      }

      setTimeout(() => {
        if (intro) intro.style.opacity = 0;

        setTimeout(() => {
          sessionStorage.setItem("hasSeenIntro", true);
          sessionStorage.setItem("fromIndex", true);
          const redirectTo = sessionStorage.getItem("targetPage") || "home.html";
          sessionStorage.removeItem("targetPage");
          window.location.href = redirectTo;
        }, 1000);
      }, 3500);
    }
  };
}

// ===============================================
// NAVBAR ACTIVE DETECTION
// ===============================================
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".navbar ul li a");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// // apa itu inspect elemen
// window.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// // Disable DevTools key shortcuts
// document.onkeydown = function (e) {
//   // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+Shift+C
//   if (
//     e.key === "F12" ||
//     (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
//     (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
//   ) {
//     e.preventDefault();
//     return false;
//   }
// };
