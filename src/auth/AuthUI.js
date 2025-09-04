// src/auth/AuthUI.js
import { $, $$, show, hide } from "../common/Utils.js";
import { AuthService, passwordChecks } from "./AuthService.js";

export const AuthUI = (() => {
  // Nodos
  let overlay; // #loginOverlay (si hay duplicados, nos quedamos con el primero)
  let loginModal; // #loginModal
  let registroModal; // #registroModal
  let btnLoginHeader; // #btnLogin

  // Login fields
  let loginEmail, loginPassword;
  let reqLen, reqUpper, reqNum;

  // Registro fields
  let regEmail, regPass, regPass2, regTerms;
  let rLen, rUpper, rNum, rMatch;

  function getNodes() {
    const overlays = $$("#loginOverlay");
    overlay = overlays[0] || null;
    // Si hay overlays duplicados, ocultamos/eliminamos los extra para evitar conflictos
    if (overlays.length > 1) {
      overlays.slice(1).forEach((el) => el.parentElement?.removeChild(el));
    }

    loginModal = $("#loginModal");
    registroModal = $("#registroModal");
    btnLoginHeader = $("#btnLogin");

    loginEmail = $("#login-email");
    loginPassword = $("#login-password");
    reqLen = $("#req-length");
    reqUpper = $("#req-mayus");
    reqNum = $("#req-num");

    regEmail = $("#registro-email");
    regPass = $("#registro-password");
    regPass2 = $("#registro-confirm");
    regTerms = $("#registro-terminos");
    rLen = $("#r-req-length");
    rUpper = $("#r-req-mayus");
    rNum = $("#r-req-num");
    rMatch = $("#r-req-match");
  }

  // ---- Modales ----
  function showModal(modal) {
    if (!modal) return;
    show(modal);
    document.documentElement.classList.add("overflow-hidden");
    overlay && show(overlay);
  }

  function hideModal(modal) {
    if (!modal) return;
    hide(modal);
    document.documentElement.classList.remove("overflow-hidden");
    // Oculta overlay si no hay ningún modal abierto
    const anyOpen = [loginModal, registroModal, ...$$(".modalPago")].some(
      (m) => m && !m.classList.contains("hidden")
    );
    if (!anyOpen && overlay) hide(overlay);
  }

  function abrirLogin() {
    closePaymentModals();
    hideModal(registroModal);
    showModal(loginModal);
  }
  function abrirRegistro() {
    closePaymentModals();
    hideModal(loginModal);
    showModal(registroModal);
  }
  function cerrarLogin() {
    hideModal(loginModal);
  }
  function cerrarRegistro() {
    hideModal(registroModal);
  }

  // ---- Toggles de password ----
  function togglePassword() {
    if (!loginPassword) return;
    loginPassword.type =
      loginPassword.type === "password" ? "text" : "password";
  }
  function toggleRegistroPassword() {
    if (!regPass) return;
    regPass.type = regPass.type === "password" ? "text" : "password";
  }
  function toggleRegistroConfirm() {
    if (!regPass2) return;
    regPass2.type = regPass2.type === "password" ? "text" : "password";
  }

  // ---- Validaciones visuales ----
  function setValid(el, ok) {
    if (!el) return;
    el.classList.toggle("text-emerald-600", ok);
    el.classList.toggle("text-slate-500", !ok);
  }

  function updateLoginChecks() {
    if (!loginPassword) return;
    const chk = passwordChecks(loginPassword.value || "");
    setValid(reqLen, chk.length);
    setValid(reqUpper, chk.upper);
    setValid(reqNum, chk.number);
  }

  function updateRegistroChecks() {
    if (!regPass || !regPass2) return;
    const chk = passwordChecks(regPass.value || "");
    setValid(rLen, chk.length);
    setValid(rUpper, chk.upper);
    setValid(rNum, chk.number);
    setValid(rMatch, !!regPass.value && regPass.value === regPass2.value);
  }

  // ---- Submit handlers ----
  async function handleLoginSubmit() {
    const email = (loginEmail?.value || "").trim();
    const pass = loginPassword?.value || "";
    try {
      if (!email || !pass) throw new Error("Ingresa email y contraseña.");
      const res = await AuthService.signIn(email, pass);
      alert("Sesión iniciada: " + res.email);
      cerrarLogin();
    } catch (e) {
      alert(e?.message || "No se pudo iniciar sesión.");
    }
  }

  async function handleRegisterSubmit() {
    const email = (regEmail?.value || "").trim();
    const pass = regPass?.value || "";
    const pass2 = regPass2?.value || "";
    const termsOk = !!regTerms?.checked;

    try {
      if (!termsOk) throw new Error("Debes aceptar los términos.");
      const checks = passwordChecks(pass);
      if (!checks.length || !checks.upper || !checks.number) {
        throw new Error("La contraseña no cumple los requisitos.");
      }
      if (pass !== pass2) throw new Error("Las contraseñas no coinciden.");

      const res = await AuthService.signUp(email, pass);
      alert("Cuenta creada: " + res.email);
      cerrarRegistro();
      abrirLogin(); // opcional
    } catch (e) {
      alert(e?.message || "No se pudo crear la cuenta.");
    }
  }

  // ---- Modales de pago (si existen) ----
  function closePaymentModals() {
    $$(".modalPago").forEach((m) => m.classList.add("hidden"));
  }

  // ---- Eventos ----
  function bindEvents() {
    // Botón header
    btnLoginHeader?.addEventListener("click", abrirLogin);

    // Overlay cierra todo
    overlay?.addEventListener("click", () => {
      cerrarLogin();
      cerrarRegistro();
      closePaymentModals();
    });

    // ESC cierra
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        cerrarLogin();
        cerrarRegistro();
        closePaymentModals();
      }
    });

    // Validaciones en vivo
    loginPassword?.addEventListener("input", updateLoginChecks);
    regPass?.addEventListener("input", updateRegistroChecks);
    regPass2?.addEventListener("input", updateRegistroChecks);
  }

  // ---- Puentes globales (para no romper tus onclick actuales) ----
  function exposeBridges() {
    // Abrir/cerrar
    window.abrirLogin = abrirLogin;
    window.abrirRegistro = abrirRegistro;
    window.cerrarLogin = cerrarLogin;
    window.cerrarRegistro = cerrarRegistro;

    // Flujos entre modales
    window.abrirRegistroDesdeLogin = () => {
      cerrarLogin();
      abrirRegistro();
    };
    window.abrirLoginDesdeRegistro = () => {
      cerrarRegistro();
      abrirLogin();
    };

    // Toggles
    window.togglePassword = togglePassword;
    window.toggleRegistroPassword = toggleRegistroPassword;
    window.toggleRegistroConfirm = toggleRegistroConfirm;

    // Submits
    window.iniciarSesion = handleLoginSubmit;
    window.registrarse = handleRegisterSubmit;

    // Pago
    window.cerrarModal = closePaymentModals;
  }

  function init() {
    getNodes();
    bindEvents();
    exposeBridges();
    updateLoginChecks();
    updateRegistroChecks();
  }

  return { init, abrirLogin, abrirRegistro, cerrarLogin, cerrarRegistro };
})();
