document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("sliderTokens");
  const tokensLabel = document.getElementById("tokensSeleccionados");
  const precioLabel = document.getElementById("precioCalculado");
  const descuentoText = document.getElementById("descuentoLabel");

  const precioBase = 9.0;

  // Tabla de precios escalonados por cantidad de tokens
  const tablaPrecios = {
    1: 9.0,
    2: 8.5,
    3: 8.0,
    4: 7.75,
    5: 7.5,
    6: 7.25,
    7: 7.0,
    8: 6.75,
    9: 6.5,
    10: 6.25,
    12: 6.0,
    15: 5.75,
    18: 5.5,
    20: 5.0,
  };

  function obtenerPrecioPorToken(tokens) {
    if (tablaPrecios[tokens]) return tablaPrecios[tokens];
    const disponibles = Object.keys(tablaPrecios)
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = disponibles.length - 1; i >= 0; i--) {
      if (tokens >= disponibles[i]) return tablaPrecios[disponibles[i]];
    }
    return precioBase;
  }

  function actualizarPrecio() {
    const tokens = parseInt(slider.value);
    const precioPorToken = obtenerPrecioPorToken(tokens);
    const total = tokens * precioPorToken;
    const descuento = precioPorToken < precioBase;
    const porcentaje = Math.round((1 - precioPorToken / precioBase) * 100);

    tokensLabel.textContent = tokens;
    precioLabel.textContent = `S/ ${total.toFixed(2)}`;

    if (descuento) {
      descuentoText.style.display = "inline-block";
      descuentoText.textContent = `¡Descuento aplicado: ${porcentaje}%!`;
    } else {
      descuentoText.style.display = "none";
    }
  }

  slider.addEventListener("input", actualizarPrecio);
  actualizarPrecio(); // inicializar al cargar
});
/* precios.js – cálculo dinámico para la sección de precios
   - Slider define cantidad de tests (1..20)
   - Precio unitario con descuento progresivo:
       1-4  => S/ 10.00 c/u
       5-9  => S/ 9.00  c/u  (10% OFF)
       10-14=> S/ 8.00  c/u  (20% OFF)
       15-20=> S/ 7.00  c/u  (30% OFF)
   - Actualiza: precio por test, ahorro y total
   - CTA “Elegir plan” -> abrirRegistro()
*/

(function () {
  const $ = (sel) => document.querySelector(sel);
  const slider = $("#sliderTests");
  const labelCantidad = $("#labelCantidad");
  const precioUnit = $("#precioUnit");
  const ahorro = $("#ahorro");
  const total = $("#total");
  const notaDescuento = $("#notaDescuento");
  const btnElegir = $("#btnElegirBasico");

  if (!slider || !labelCantidad) return;

  function tramoPrecio(cant) {
    if (cant >= 15) return 7;
    if (cant >= 10) return 8;
    if (cant >= 5) return 9;
    return 10;
  }

  function recalcular() {
    const cant = parseInt(slider.value, 10);
    const unit = tramoPrecio(cant);
    const sinDesc = cant * 10; // base sin descuento (S/10 c/u)
    const conDesc = cant * unit; // con tramo aplicado
    const ahorroVal = Math.max(0, sinDesc - conDesc);

    labelCantidad.textContent = cant;
    precioUnit.textContent = `S/ ${unit.toFixed(2)}`;
    ahorro.textContent = `- S/ ${ahorroVal.toFixed(2)}`;
    total.textContent = `S/ ${conDesc.toFixed(2)}`;

    // Mensaje de nota
    if (cant >= 5) {
      const pct = Math.round((1 - unit / 10) * 100);
      notaDescuento.textContent = `Descuento aplicado ${pct}% por volumen.`;
    } else {
      notaDescuento.textContent = `Descuento progresivo desde 5 tests.`;
    }
  }

  slider.addEventListener("input", recalcular);
  btnElegir?.addEventListener("click", () => {
    try {
      abrirRegistro();
    } catch (e) {
      /* si no existe, no rompe */
    }
  });

  // Init
  recalcular();
})();
