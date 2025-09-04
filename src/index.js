// src/index.js
import { NavBar } from "./common/NavBar.js";
import { initPricingCalculator } from "./pricing/PricingCalculator.js";
import { initTestsFilter } from "./tests/TestsList.js";
import { AuthUI } from "./auth/AuthUI.js";
import { Carousel } from "./testimonials/Carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  NavBar.init();
  initPricingCalculator();
  initTestsFilter();
  AuthUI.init();
  Carousel.init({
    // Si quieres conservar TUS IDs viejos:
    // viewportSel: '#carruselViewport', // si lo tuvieras
    trackSel: "#carruselTrack",
    dotsSel: "#carruselPuntos",
    // prevSel: '#t-prev', nextSel: '#t-next', // si agregas botones
    maxItems: 6,
    randomize: true,
    autoplay: true,
    intervalMs: 5000,
  });
});
