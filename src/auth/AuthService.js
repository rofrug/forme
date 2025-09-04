// src/auth/AuthService.js
// Capa de servicio. Aquí luego conectas Firebase (o tu backend).
// Interfaz estable que usa el UI.

export const AuthService = {
  // Email/Password
  async signIn(email, password) {
    // TODO: reemplazar por Firebase Auth
    // Ejemplo con Firebase después:
    // const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
    // const auth = getAuth();
    // return signInWithEmailAndPassword(auth, email, password);

    await wait(400);
    // Simulación simple
    if (!email || !password) throw new Error("Completa email y contraseña.");
    return { uid: "demo-uid", email };
  },

  async signUp(email, password) {
    await wait(500);
    if (!email || !password) throw new Error("Completa email y contraseña.");
    // Aquí validas fuerza de password si quieres
    return { uid: "demo-uid", email };
  },

  async signOut() {
    await wait(200);
    return true;
  },

  async signInWithGoogle() {
    await wait(400);
    // Reemplazar por GoogleProvider de Firebase si usas Firebase
    return {
      uid: "demo-uid-google",
      email: "user@example.com",
      provider: "google",
    };
  },
};

// Helpers
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Validador sencillo de contraseña (útil también para UI)
export function passwordChecks(pw) {
  return {
    length: typeof pw === "string" && pw.length >= 8,
    upper: /[A-ZÁÉÍÓÚÑ]/.test(pw || ""),
    number: /\d/.test(pw || ""),
  };
}
