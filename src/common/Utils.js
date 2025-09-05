// src/common/Utils.js

/**
 * Selecciona el primer elemento que coincide con el selector.
 * @param {string} s - Selector CSS.
 * @param {ParentNode} [ctx=document] - Contexto de búsqueda.
 * @returns {Element|null}
 */
export const $ = (s, ctx = document) => (ctx ? ctx.querySelector(s) : null);

/**
 * Selecciona todos los elementos que coinciden con el selector y los convierte en array.
 * @param {string} s - Selector CSS.
 * @param {ParentNode} [ctx=document] - Contexto de búsqueda.
 * @returns {Element[]}
 */
export const $$ = (s, ctx = document) =>
  ctx ? Array.from(ctx.querySelectorAll(s)) : [];

/**
 * Formatea un número como moneda. Por defecto: Perú (PEN).
 * Maneja valores falsy/NaN de forma segura.
 * @param {number} value - Valor numérico.
 * @param {{ locale?: string, currency?: string }} [opts]
 * @returns {string}
 */
export function formatCurrency(
  value,
  { locale = "es-PE", currency = "PEN" } = {}
) {
  const n = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    // Fallback simple si el Intl falla por locale/currency inválidos.
    return `${n.toFixed(2)} ${currency}`;
  }
}

/**
 * Restringe un número al rango [min, max].
 * Devuelve NaN si n/min/max no son números finitos.
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (n, min, max) => {
  if (![n, min, max].every(Number.isFinite)) return NaN;
  return Math.min(Math.max(n, min), max);
};
