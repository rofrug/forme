// Importaciones desde Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AQUÍ_TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "ID_DEL_PROYECTO",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función de login
window.iniciarSesion = async function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Bienvenido ✨");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

// Función de registro
window.registrarse = async function () {
    const email = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-password").value;
    const confirm = document.getElementById("registro-confirm").value;

    if (password !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cuenta creada. Ahora puedes iniciar sesión.");
    } catch (error) {
        alert("Error: " + error.message);
    }
};
