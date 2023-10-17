import { createStore } from "vuex";
const store = createStore({
  state: { logued: false, total: 0 },
  actions: {
    logout({ commit }) {
      commit("setLogued", false);
    },
  },
  mutations: {
    setLogued(state) {
      state.logued = value;
    },
  },
});
export default store;
