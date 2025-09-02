document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburger = document.getElementById("hamburger");
    const links = document.querySelectorAll('[data-scroll]');
    const header = document.querySelector('header');
    let isOpen = false;

    // Header con sombra al hacer scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }
    });

    // Toggle del menú móvil
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;

        mobileMenu.classList.toggle("opacity-0", !isOpen);
        mobileMenu.classList.toggle("scale-y-0", !isOpen);
        mobileMenu.classList.toggle("opacity-100", isOpen);
        mobileMenu.classList.toggle("scale-y-100", isOpen);

        const [line1, line2, line3] = hamburger.children;
        line1.classList.toggle("rotate-45", isOpen);
        line1.classList.toggle("translate-y-[6px]", isOpen);
        line2.classList.toggle("opacity-0", isOpen);
        line3.classList.toggle("-rotate-45", isOpen);
        line3.classList.toggle("-translate-y-[6px]", isOpen);
    });

    // Cerrar menú móvil si haces clic fuera
    window.addEventListener("click", (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleBtn.click();
        }
    });

    // Scroll suave al hacer clic en enlaces
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("data-scroll");
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                if (window.innerWidth < 768 && isOpen) toggleBtn.click();
            }
        });
    });

    // Resalta el enlace activo según scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const link = document.querySelector(`[data-scroll="#${entry.target.id}"]`);
                if (link) {
                    if (entry.isIntersecting) {
                        link.classList.add("text-teal-300", "font-bold");
                    } else {
                        link.classList.remove("text-teal-300", "font-bold");
                    }
                }
            });
        },
        { threshold: 0.6 }
    );

    document.querySelectorAll("section[id]").forEach(sec => observer.observe(sec));
});
document.getElementById("cantidadPuntos").textContent = "120";
document.getElementById("cantidadPuntosMobile").textContent = "120";
