// src/testimonials/Carousel.js
export const Carousel = (() => {
  const defaults = {
    viewportSel: "#t-viewport", // contenedor con overflow-x oculto
    trackSel: "#t-track", // contenedor de tarjetas (children = slides)
    dotsSel: "#t-dots", // contenedor de puntitos
    prevSel: "#t-prev", // opcional (botón anterior)
    nextSel: "#t-next", // opcional (botón siguiente)
    liveSel: "#t-live", // opcional (aria-live)
    maxItems: 6, // cuántas tarjetas mostrar (si hay más, las recorta)
    randomize: true, // barajar tarjetas
    autoplay: true,
    intervalMs: 3500,
  };

  function init(options = {}) {
    const cfg = { ...defaults, ...options };

    const viewport = document.querySelector(cfg.viewportSel) || null;
    const track = document.querySelector(cfg.trackSel) || null;
    if (!track) return; // sin track, nada que hacer

    // Si no hay viewport, usamos el padre del track como fallback
    const vp = viewport || track.parentElement;
    if (!vp) return;

    const dotsBox = document.querySelector(cfg.dotsSel) || null;
    const btnPrev = document.querySelector(cfg.prevSel) || null;
    const btnNext = document.querySelector(cfg.nextSel) || null;
    const live = document.querySelector(cfg.liveSel) || null;

    // 1) preparar items
    const original = Array.from(track.children);
    if (!original.length) return;

    const items = cfg.randomize
      ? shuffle(original).slice(
          0,
          Math.max(1, Math.min(cfg.maxItems, original.length))
        )
      : original.slice(0, Math.max(1, Math.min(cfg.maxItems, original.length)));

    // rellenar track con la selección
    if (cfg.randomize || items.length !== original.length) {
      track.innerHTML = "";
      items.forEach((n) => track.appendChild(n));
    }

    // estilos mínimos (opcional si ya los tienes en Tailwind)
    vp.style.overflowX = "hidden";
    track.style.display = "flex";
    track.style.gap = track.style.gap || "24px";
    track.style.scrollBehavior = "smooth";

    let index = 0;
    let autoplayId = null;
    let isHover = false;
    let inView = true;

    // 2) Funciones core
    function goTo(i, announce = true) {
      const total = items.length;
      index = (i + total) % total;
      // usamos offsetLeft del item para no depender del gap/tamaño
      const left = items[index].offsetLeft;
      vp.scrollTo({ left, behavior: "smooth" });
      renderDots();
      if (announce && live)
        live.textContent = `Mostrando testimonio ${index + 1} de ${total}`;
    }

    function next() {
      goTo(index + 1);
    }
    function prev() {
      goTo(index - 1);
    }

    function onResize() {
      // Al cambiar de tamaño, re-ubicar al slide activo
      goTo(index, false);
    }

    // 3) Dots
    function renderDots() {
      if (!dotsBox) return;
      const total = items.length;
      dotsBox.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className =
          "w-2.5 h-2.5 rounded-full transition-all mx-1 " +
          (i === index ? "bg-slate-900" : "bg-slate-300");
        b.setAttribute("aria-label", `Ir al testimonio ${i + 1}`);
        b.addEventListener("click", () => goTo(i));
        dotsBox.appendChild(b);
      }
    }

    // 4) Autoplay + pausa por hover/viewport
    function startAutoplay() {
      if (!cfg.autoplay || autoplayId) return;
      autoplayId = setInterval(() => {
        if (!isHover && inView) next();
      }, cfg.intervalMs);
    }
    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = null;
    }

    // Hover
    vp.addEventListener("mouseenter", () => {
      isHover = true;
    });
    vp.addEventListener("mouseleave", () => {
      isHover = false;
    });

    // IntersectionObserver (pausa cuando no se ve)
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
      },
      { threshold: 0.25 }
    );
    io.observe(vp);

    // 5) Swipe táctil
    let startX = 0;
    vp.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    vp.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    });

    // 6) Botones prev/next (opcionales)
    btnPrev?.addEventListener("click", prev);
    btnNext?.addEventListener("click", next);

    // 7) Snap manual → actualizar índice aprox. al centro
    let snapTimeout = null;
    vp.addEventListener(
      "scroll",
      () => {
        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          let bestI = 0,
            bestDelta = Infinity;
          const cur = vp.scrollLeft + vp.clientWidth / 2;
          items.forEach((it, i) => {
            const mid = it.offsetLeft + it.clientWidth / 2;
            const d = Math.abs(mid - cur);
            if (d < bestDelta) {
              bestDelta = d;
              bestI = i;
            }
          });
          if (bestI !== index) goTo(bestI, false);
        }, 120);
      },
      { passive: true }
    );

    // Init
    renderDots();
    goTo(0, false);
    window.addEventListener("resize", onResize, { passive: true });
    startAutoplay();

    // util
    function shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // cleanup opcional (si más adelante necesitas desmontar)
    return () => {
      stopAutoplay();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }

  return { init };
})();
