// src/index.js
import { NavBar } from "./common/NavBar.js";
import { initPricingCalculator } from "./pricing/PricingCalculator.js";

document.addEventListener("DOMContentLoaded", () => {
  NavBar.init();
  initPricingCalculator();
  initTestsFilter();
  AuthUI.init();

  // Usa los IDs por defecto del HTML (#t-track, #t-dots), sin overrides
  Carousel.init({
    maxItems: 6,
    randomize: true,
    autoplay: true,
    intervalMs: 5000,
  });
});
