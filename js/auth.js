// src/auth/AuthUI.js

// Utilidades DOM para seleccionar múltiples veces por ID sin repetir líneas
const $ = (s) => document.querySelector(s);

export function initAuthUI() {
  const loginOverlay = $("#loginOverlay");
  const loginModal = $("#loginModal");
  const registroModal = $("#registroModal");

  // Funciones de apertura y cierre
  const abrirLogin = () => {
    loginOverlay.classList.remove("hidden");
    loginModal.classList.remove("hidden");
    loginModal.classList.add("slide-in-left");
    document.body.style.overflow = "hidden";
  };

  const abrirRegistro = () => {
    loginOverlay.classList.remove("hidden");
    registroModal.classList.remove("hidden");
    registroModal.classList.add("slide-in-right");
    document.body.style.overflow = "hidden";
  };

  const cerrarLogin = () => {
    loginModal.classList.add("hidden");
    loginModal.classList.remove("slide-in-left", "slide-in-right");
    loginOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  };

  const cerrarRegistro = () => {
    registroModal.classList.add("hidden");
    registroModal.classList.remove("slide-in-left", "slide-in-right");
    loginOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  };

  loginOverlay?.addEventListener("click", () => {
    cerrarLogin();
    cerrarRegistro();
  });

  // Switch entre login y registro
  $("[data-open='registroDesdeLogin']")?.addEventListener("click", () => {
    cerrarLogin();
    setTimeout(abrirRegistro, 250);
  });

  $("[data-open='loginDesdeRegistro']")?.addEventListener("click", () => {
    cerrarRegistro();
    setTimeout(abrirLogin, 250);
  });

  // Toggle de contraseñas
  $("[data-toggle='login-password']")?.addEventListener("click", () => {
    const input = $("#login-password");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    event.target.textContent = isHidden ? "Ocultar" : "Mostrar";
  });

  $("[data-toggle='registro-password']")?.addEventListener("click", () => {
    const input = $("#registro-password");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    event.target.textContent = isHidden ? "Ocultar" : "Mostrar";
  });

  $("[data-toggle='registro-confirm']")?.addEventListener("click", () => {
    const input = $("#registro-confirm");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    event.target.textContent = isHidden ? "Ocultar" : "Mostrar";
  });

  // Validaciones visuales
  $("#login-password")?.addEventListener("input", (e) => {
    const val = e.target.value;
    $("#req-length").classList.toggle("text-teal-600", val.length >= 8);
    $("#req-mayus").classList.toggle("text-teal-600", /[A-Z]/.test(val));
    $("#req-num").classList.toggle("text-teal-600", /\d/.test(val));
  });

  $("#registro-password")?.addEventListener("input", () => {
    const val = $("#registro-password").value;
    $("#r-req-length").classList.toggle("text-teal-600", val.length >= 8);
    $("#r-req-mayus").classList.toggle("text-teal-600", /[A-Z]/.test(val));
    $("#r-req-num").classList.toggle("text-teal-600", /\d/.test(val));
    actualizarCoincidencia();
  });

  $("#registro-confirm")?.addEventListener("input", actualizarCoincidencia);

  function actualizarCoincidencia() {
    const pass = $("#registro-password").value;
    const conf = $("#registro-confirm").value;
    $("#r-req-match").classList.toggle(
      "text-teal-600",
      pass === conf && pass !== ""
    );
  }

  // Botones de abrir login/registro desde UI
  $(`[data-open='login']`)?.addEventListener("click", abrirLogin);
  $(`[data-open='registro']`)?.addEventListener("click", abrirRegistro);

  // Botones de cerrar modales
  $(`[data-close='login']`)?.addEventListener("click", cerrarLogin);
  $(`[data-close='registro']`)?.addEventListener("click", cerrarRegistro);
}
