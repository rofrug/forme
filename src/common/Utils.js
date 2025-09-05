// src/common/Utils.js

/**
 * Selecciona el primer elemento que coincide con el selector.
 * Seguro para SSR (si no hay `document`, devuelve null).
 * @param {string} s - Selector CSS.
 * @param {ParentNode} [ctx] - Contexto de búsqueda.
 * @returns {Element|null}
 */
export const $ = (s, ctx) => {
  const root = ctx ?? (typeof document !== "undefined" ? document : null);
  return root ? root.querySelector(s) : null;
};

/**
 * Selecciona todos los elementos que coinciden con el selector y los devuelve como array.
 * Seguro para SSR (si no hay `document`, devuelve []).
 * @param {string} s - Selector CSS.
 * @param {ParentNode} [ctx] - Contexto de búsqueda.
 * @returns {Element[]}
 */
export const $$ = (s, ctx) => {
  const root = ctx ?? (typeof document !== "undefined" ? document : null);
  return root ? Array.from(root.querySelectorAll(s)) : [];
};

/**
 * Formatea un número como moneda. Por defecto: Perú (PEN).
 * Maneja valores falsy/NaN de forma segura y valida el código de moneda.
 * @param {number|string} value - Valor numérico (o string numérico).
 * @param {{ locale?: string, currency?: string }} [opts]
 * @returns {string}
 */
export function formatCurrency(
  value,
  { locale = "es-PE", currency = "PEN" } = {}
) {
  const n = Number(value);
  const safeNumber = Number.isFinite(n) ? n : 0;

  // Normaliza el código de moneda a 3 letras mayúsculas (fallback a PEN)
  const cur =
    typeof currency === "string" && /^[A-Za-z]{3}$/.test(currency)
      ? currency.toUpperCase()
      : "PEN";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: cur,
      minimumFractionDigits: 2,
    }).format(safeNumber);
  } catch {
    // Fallback simple si Intl falla por locale/currency inválidos.
    return `${safeNumber.toFixed(2)} ${cur}`;
  }
}

/**
 * Restringe un número al rango [min, max].
 * Si min > max, se invierten para evitar resultados inesperados.
 * Devuelve NaN si n/min/max no son números finitos.
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (n, min, max) => {
  if (![n, min, max].every(Number.isFinite)) return NaN;
  let lo = min, hi = max;
  if (lo > hi) [lo, hi] = [hi, lo];
  return Math.min(Math.max(n, lo), hi);
};
// Smooth scroll a un elemento o selector (con offset opcional)
export function smoothScrollTo(target, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - (offset || 0);
  window.scrollTo({ top: y, behavior: 'smooth' });
  
}
