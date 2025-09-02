document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carruselTrack");
    const puntos = document.getElementById("carruselPuntos");
    const todasLasTarjetas = Array.from(track.children);
    const maxTarjetas = 6;
    let actual = 0;
    let autoplayActivo = true;

    // Limpiar y seleccionar tarjetas aleatorias
    while (track.firstChild) {
        track.removeChild(track.firstChild);
    }

    const tarjetasAleatorias = todasLasTarjetas
        .sort(() => 0.5 - Math.random())
        .slice(0, maxTarjetas);

    tarjetasAleatorias.forEach(t => track.appendChild(t));
    const total = track.children.length;

    // Carrusel automático
    setInterval(() => {
        if (!autoplayActivo) return;
        actual = (actual + 1) % total;
        actualizarCarrusel();
    }, 5000);

    // Crear puntos de navegación
    function renderPuntos() {
        puntos.innerHTML = "";
        for (let i = 0; i < total; i++) {
            const punto = document.createElement("div");
            punto.className = `w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${i === actual ? "bg-teal-600 scale-110" : "bg-slate-300"}`;
            punto.addEventListener("click", () => {
                actual = i;
                actualizarCarrusel();
            });
            puntos.appendChild(punto);
        }
    }

    // Actualiza el carrusel con transición
    function actualizarCarrusel() {
        const ancho = track.clientWidth;
        track.style.transform = `translateX(-${actual * ancho}px)`;
        renderPuntos();
    }

    window.addEventListener("resize", actualizarCarrusel);

    // Soporte táctil para móviles
    let inicioX = 0;
    track.addEventListener("touchstart", e => {
        inicioX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", e => {
        const finX = e.changedTouches[0].clientX;
        const diferencia = finX - inicioX;

        if (Math.abs(diferencia) > 50) {
            if (diferencia < 0 && actual < total - 1) actual++;
            else if (diferencia > 0 && actual > 0) actual--;
            actualizarCarrusel();
        }
    });

    // Inicializar carrusel
    renderPuntos();
    actualizarCarrusel();
});
