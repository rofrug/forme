// src/common/Utils.js

// Selectores cortos
export const $ = (s, ctx = document) => ctx.querySelector(s);
export const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// Formato de moneda (Perú por defecto)
export function formatCurrency(
  value,
  { locale = "es-PE", currency = "PEN" } = {}
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value || 0);
}

// Números
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Tiempo
export const debounce = (fn, delay = 250) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};
export const throttle = (fn, delay = 250) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
};

// DOM helpers
export function show(el) {
  if (!el) return;
  el.classList.remove("hidden");
  el.setAttribute("aria-hidden", "false");
}
export function hide(el) {
  if (!el) return;
  el.classList.add("hidden");
  el.setAttribute("aria-hidden", "true");
}
export function toggle(el, force) {
  if (!el) return;
  el.classList.toggle("hidden", force);
}

// Scroll suave a un selector o nodo
export function smoothScrollTo(target) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Delegación de eventos
export function on(root, event, selector, handler) {
  root.addEventListener(event, (e) => {
    const match = e.target.closest(selector);
    if (match && root.contains(match)) handler(e, match);
  });
}

// IDs simples
export const uid = (p = "id") =>
  `${p}-${Math.random().toString(36).slice(2, 9)}`;
