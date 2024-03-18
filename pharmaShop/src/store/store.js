import Cookies from "js-cookie";
import { createStore } from "vuex";

// Comprueba si la cookie existe y si es válida
const userToken = Cookies.get("userToken");
let initialState = false; // Valor predeterminado si la cookie no existe o es inválida
if (userToken) {
  try {
    initialState = JSON.parse(decodeURIComponent(userToken));
  } catch (error) {
    console.error("Error al analizar la cookie 'userToken':", error);
  }
}

const store = createStore({
  state: {
    logued: initialState,
  },
  actions: {
    logout({ commit }) {
      commit("setLogued", false); // Corregir el nombre de la mutación
      Cookies.remove("userToken"); // Elimina la cookie al cerrar sesión
    },
  },
  mutations: {
    setLogued(state, value) {
      state.logued = value;
      if (value) {
        // Guarda la cookie al iniciar sesión
        Cookies.set("userToken", encodeURIComponent(JSON.stringify(value)));
      } else {
        // Elimina la cookie si el usuario cierra sesión
        Cookies.remove("userToken");
      }
    },
  },
});

export default store;
