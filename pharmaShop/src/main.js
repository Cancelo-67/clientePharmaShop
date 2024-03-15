import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";

const app = createApp(App);

// Estado de autenticación simulado
const isAuthenticated = ref(false);
app.config.globalProperties.$isAuthenticated = isAuthenticated;

app.use(store);
app.use(router);
app.mount("#app");
