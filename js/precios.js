document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('sliderTokens');
    const tokensLabel = document.getElementById('tokensSeleccionados');
    const precioLabel = document.getElementById('precioCalculado');
    const descuentoText = document.getElementById('descuentoLabel');

    const precioBase = 9.0;

    // Tabla de precios escalonados por cantidad de tokens
    const tablaPrecios = {
        1: 9.00, 2: 8.50, 3: 8.00, 4: 7.75, 5: 7.50,
        6: 7.25, 7: 7.00, 8: 6.75, 9: 6.50, 10: 6.25,
        12: 6.00, 15: 5.75, 18: 5.50, 20: 5.00
    };

    function obtenerPrecioPorToken(tokens) {
        if (tablaPrecios[tokens]) return tablaPrecios[tokens];
        const disponibles = Object.keys(tablaPrecios).map(Number).sort((a, b) => a - b);
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
            descuentoText.style.display = 'inline-block';
            descuentoText.textContent = `¡Descuento aplicado: ${porcentaje}%!`;
        } else {
            descuentoText.style.display = 'none';
        }
    }

    slider.addEventListener('input', actualizarPrecio);
    actualizarPrecio(); // inicializar al cargar
});
