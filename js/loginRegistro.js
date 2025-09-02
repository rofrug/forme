document.addEventListener("DOMContentLoaded", () => {
    const loginOverlay = document.getElementById("loginOverlay");
    const loginModal = document.getElementById("loginModal");
    const registroModal = document.getElementById("registroModal");

    // Mostrar login
    window.abrirLogin = () => {
        loginOverlay.classList.remove("hidden");
        loginModal.classList.remove("hidden");
        loginModal.classList.add("slide-in-left");
        document.body.style.overflow = "hidden";
    };

    // Mostrar registro
    window.abrirRegistro = () => {
        loginOverlay.classList.remove("hidden");
        registroModal.classList.remove("hidden");
        registroModal.classList.add("slide-in-right");
        document.body.style.overflow = "hidden";
    };

    // Cerrar ambos
    window.cerrarLogin = () => {
        loginModal.classList.add("hidden");
        loginModal.classList.remove("slide-in-left", "slide-in-right");
        loginOverlay.classList.add("hidden");
        document.body.style.overflow = "";
    };

    window.cerrarRegistro = () => {
        registroModal.classList.add("hidden");
        registroModal.classList.remove("slide-in-left", "slide-in-right");
        loginOverlay.classList.add("hidden");
        document.body.style.overflow = "";
    };

    // Clic afuera del modal para cerrar
    loginOverlay.addEventListener("click", () => {
        cerrarLogin();
        cerrarRegistro();
    });

    // Cambios entre login y registro
    window.abrirRegistroDesdeLogin = () => {
        cerrarLogin();
        setTimeout(() => abrirRegistro(), 250);
    };

    window.abrirLoginDesdeRegistro = () => {
        cerrarRegistro();
        setTimeout(() => abrirLogin(), 250);
    };

    // Mostrar/ocultar contraseña login
    window.togglePassword = () => {
        const input = document.getElementById("login-password");
        const btn = event.target;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.textContent = isHidden ? "Ocultar" : "Mostrar";
    };

    // Validación visual login
    document.getElementById("login-password").addEventListener("input", function () {
        const val = this.value;
        document.getElementById("req-length").classList.toggle("text-teal-600", val.length >= 8);
        document.getElementById("req-mayus").classList.toggle("text-teal-600", /[A-Z]/.test(val));
        document.getElementById("req-num").classList.toggle("text-teal-600", /\d/.test(val));
    });

    // Mostrar/ocultar contraseñas en registro
    window.toggleRegistroPassword = () => {
        const input = document.getElementById("registro-password");
        const btn = event.target;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.textContent = isHidden ? "Ocultar" : "Mostrar";
    };

    window.toggleRegistroConfirm = () => {
        const input = document.getElementById("registro-confirm");
        const btn = event.target;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.textContent = isHidden ? "Ocultar" : "Mostrar";
    };

    // Validación visual en registro (opcional)
    document.getElementById("registro-password").addEventListener("input", function () {
        const val = this.value;
        document.getElementById("r-req-length").classList.toggle("text-teal-600", val.length >= 8);
        document.getElementById("r-req-mayus").classList.toggle("text-teal-600", /[A-Z]/.test(val));
        document.getElementById("r-req-num").classList.toggle("text-teal-600", /\d/.test(val));
        actualizarCoincidencia();
    });

    document.getElementById("registro-confirm").addEventListener("input", actualizarCoincidencia);

    function actualizarCoincidencia() {
        const pass = document.getElementById("registro-password").value;
        const conf = document.getElementById("registro-confirm").value;
        document.getElementById("r-req-match").classList.toggle("text-teal-600", pass === conf && pass !== "");
    }
});
