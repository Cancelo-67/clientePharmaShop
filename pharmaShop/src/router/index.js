import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/Products.vue";
import DetailProduct from "../pages/DetailProduct.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Category from "../pages/Category.vue";
import Cart from "../pages/Cart.vue";
import Favorites from "../pages/Favorites.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id",
    name: "DetailProduct",
    component: DetailProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false, hideNavbar: true }, // No requiere autenticación
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, hideNavbar: true }, // No requiere autenticación
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/:category",
    name: "Category",
    component: Category,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/favorites",
    beboreEnter: (to, from, next) => {
      if (1 === 1) next("/login");
      else next();
    },
    name: "Favorites",
    component: Favorites,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.meta.requiresAuth;
//   const isAuthenticated = true;

//   if (requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else if (to.name === "Login" || to.name === "Register") {
//     if (isAuthenticated) {
//       next("/login"); // Si el usuario está autenticado, redirige a la página de perfil si intenta acceder a la página de inicio de sesión o registro
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
