// Implementa la lógica interactiva de la sección de precios. Al iniciarse con initPricingCalculator(), obtiene elementos como el slider de tokens (#sliderTokens) y campos de texto para mostrar valores (#valorTokens, #precioUnidad, #precioTotal, etc.). Registra un evento input en el slider para recalcular el precio unitario y total según la cantidad seleccionada. Los precios por tramo (tiers) y la moneda se obtienen de constantes definidas en el proyecto. Por ejemplo, el código determina si se aplica un descuento mostrando u ocultando una etiqueta de “Descuento aplicado” (#badgeDescuento) dependiendo del precio unitario calculado.

import { $, $$, clamp, formatCurrency } from "../common/Utils.js";
import { PRICING_TIERS, CURRENCY } from "../common/constants.js";

export function initPricingCalculator() {
  const slider = $("#sliderTokens");
  const valorTokens = $("#valorTokens");
  const precioUnidadEl = $("#precioUnidad");
  const precioTotalEl = $("#precioTotal");
  const resumenTokens = $("#resumenTokens");
  const resumenTotal = $("#resumenTotal");
  const badgeDescuento = $("#badgeDescuento");

  if (!slider) return;

  const min = parseInt(slider.min, 10) || 1;
  const max = parseInt(slider.max, 10) || (PRICING_TIERS.at(-1)?.hasta ?? 50);

  function unitPriceFor(tokens) {
    for (const t of PRICING_TIERS) if (tokens <= t.hasta) return t.unit;
    return PRICING_TIERS[PRICING_TIERS.length - 1].unit;
  }
  const baseUnit = PRICING_TIERS[0].unit;

  function update() {
    const tokens = clamp(parseInt(slider.value, 10) || min, min, max);
    slider.value = tokens;

    const unit = unitPriceFor(tokens);
    const total = tokens * unit;

    valorTokens && (valorTokens.textContent = tokens);
    precioUnidadEl &&
      (precioUnidadEl.textContent = formatCurrency(unit, {
        locale: CURRENCY.locale,
        currency: CURRENCY.code,
      }));
    precioTotalEl &&
      (precioTotalEl.textContent = formatCurrency(total, {
        locale: CURRENCY.locale,
        currency: CURRENCY.code,
      }));
    resumenTokens && (resumenTokens.textContent = tokens);
    resumenTotal &&
      (resumenTotal.textContent = formatCurrency(total, {
        locale: CURRENCY.locale,
        currency: CURRENCY.code,
      }));

    if (badgeDescuento) {
      if (unit < baseUnit) badgeDescuento.classList.remove("hidden");
      else badgeDescuento.classList.add("hidden");
    }
  }

  slider.addEventListener("input", update);

  update();
}
