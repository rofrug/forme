// src/tests/TestsList.js
import { $, $$ } from "../common/Utils.js";

export function initTestsFilter() {
  const buttons = $$("#tests [data-filter]");
  const cards = $$("#tests [data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      buttons.forEach((b) => b.classList.remove("bg-slate-900", "text-white"));
      btn.classList.add("bg-slate-900", "text-white");

      cards.forEach((card) => {
        const cats = (card.getAttribute("data-category") || "").split(/\s+/);
        const show = f === "all" || cats.includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });

  $('#tests [data-filter="all"]')?.click();
}
