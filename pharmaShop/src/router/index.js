import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/Products.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: true, hideNavbar: true }, // Oculta el Navbar en esta ruta
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: true, hideNavbar: true }, // Oculta el Navbar en esta ruta
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
