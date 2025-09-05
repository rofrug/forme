//Configura el menú responsive. Al inicializarse, busca el botón de menú móvil y el menú desplegable, y agrega listeners para abrir/cerrar el menú con animaciones de clases. También implementa scroll suave al hacer clic en los enlaces de navegación para desplazarse a secciones específicas de la página. Añade un efecto de sombra al header al hacer scroll.

import { $, $$, smoothScrollTo } from "./Utils.js";

export const NavBar = (() => {
  let isOpen = false;
  let toggleBtn, hamburger, mobileMenu;

  function openMenu() {
    if (!mobileMenu) return;
    isOpen = true;
    document.documentElement.classList.add("overflow-hidden");
    toggleBtn?.setAttribute("aria-expanded", "true");
    mobileMenu.classList.remove(
      "opacity-0",
      "scale-y-0",
      "pointer-events-none"
    );
    mobileMenu.classList.add("opacity-100", "scale-y-100");
  }

  function closeMenu() {
    if (!mobileMenu) return;
    isOpen = false;
    document.documentElement.classList.remove("overflow-hidden");
    toggleBtn?.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("opacity-0", "scale-y-0", "pointer-events-none");
    mobileMenu.classList.remove("opacity-100", "scale-y-100");
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  function setupSmoothScroll() {
    $$("[data-scroll]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = a.getAttribute("data-scroll") || a.getAttribute("href");
        if (!target || !target.startsWith("#")) return;
        e.preventDefault();
        smoothScrollTo(target);
        if (isOpen) closeMenu();
      });
    });
  }

  function setupMenu() {
    toggleBtn = $("#menu-toggle");
    hamburger = $("#hamburger", toggleBtn?.ownerDocument || document);
    mobileMenu = $("#mobile-menu");
    if (!toggleBtn || !mobileMenu) return;

    mobileMenu.classList.add("pointer-events-none");
    toggleBtn.setAttribute("aria-controls", "mobile-menu");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.addEventListener("click", toggleMenu);

    $$('#mobile-menu a[href^="#"], #mobile-menu [data-scroll]').forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    });
  }

  function setupHeaderShadowOnScroll() {
    const header = document.querySelector("header");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add("shadow-sm");
      else header.classList.remove("shadow-sm");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    setupMenu();
    setupSmoothScroll();
    setupHeaderShadowOnScroll();
  }

  return { init, openMenu, closeMenu, toggleMenu };
})();
