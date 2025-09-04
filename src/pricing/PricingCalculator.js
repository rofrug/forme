// src/pricing/PricingCalculator.js
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

  // Quick picks
  $$("#precios [data-set-tokens]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = parseInt(btn.getAttribute("data-set-tokens"), 10);
      if (!isNaN(t)) {
        slider.value = clamp(t, min, max);
        update();
      }
      const target = btn.getAttribute("data-scroll");
      if (target)
        document
          .querySelector(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  update();
}
