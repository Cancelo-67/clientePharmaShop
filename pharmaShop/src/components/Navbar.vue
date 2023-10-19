<template>
  <nav class="navbar">
    <div v-if="logued" class="navbar-logo">
      <router-link to="/"
        ><img class="img-logo" src="../images/logo.png" alt="Logo"
      /></router-link>
    </div>
    <div v-if="!logued" class="navbar-logo">
      <img class="img-logo" src="../images/logo.png" alt="Logo" />
    </div>
    <div :class="classNavBarIcons">
      <!-- Usuario logueado desktop -->
      <router-link v-if="logued" to="/profile" class="navbar-icon">
        <button>Categoria 1</button>
      </router-link>
      <router-link v-if="logued" to="/cart" class="navbar-icon">
        <button>Categoria 2</button>
      </router-link>
      <router-link v-if="logued" to="/login" class="navbar-icon">
        <i @click="logOut" class="fa-solid fa-right-from-bracket"></i>
      </router-link>
      <!-- Usuario no logueado desktop -->
      <router-link v-if="!logued" to="/login" class="btn-navbar">
        <p>Iniciar sesión</p>
      </router-link>
      <router-link v-if="!logued" to="/register" class="btn-navbar">
        <p>Registrarse</p>
      </router-link>
    </div>
    <!-- Botón de menú desplegable para móviles -->
    <div class="menu-button" @click="toggleMobileMenu">
      <i class="fa-solid fa-bars" style="color: #003366"></i>
    </div>
    <!-- Menú SI logueado desplegable para dispositivos móviles -->
    <transition name="slide">
      <div class="mobile-menu" v-if="showMobileMenu">
        <router-link to="/" class="mobile-menu-item" v-if="logued">
          <i class="fa-solid fa-house"></i>
        </router-link>
        <router-link to="/cart" class="mobile-menu-item" v-if="logued">
          <i class="fa-solid fa-cart-shopping"></i>
        </router-link>
        <router-link to="/login" class="mobile-menu-item" v-if="logued">
          <i class="fa-solid fa-right-from-bracket"></i>
        </router-link>
        <!-- Menú NO logueado desplegable para dispositivos móviles -->
        <router-link to="/login" class="mobile-menu-item" v-if="!logued">
          Iniciar Sesión
        </router-link>
        <router-link to="/register" class="mobile-menu-item" v-if="!logued">
          Registrarse
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  data() {
    return {
      showMobileMenu: false,
      logued: true,
      classNavBarIcons: "navbar-iconsLogued",
    };
  },
  watch: {
    $route(to, from) {
      this.showMobileMenu = false; // Sirve para quitar el menu de la pantalla cuando cambia de ruta
    },
  },
  methods: {
    ...mapMutations(["setLogued"]),
    changeValue() {
      this.setLogued(false);
      this.showMobileMenu = false;
      localStorage.removeItem("userLogued");
    },
    logOut() {
      this.changeValue();
      this.$router.push("/");
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    changeClassNavbarIcons() {
      if (this.logued) {
        this.classNavBarIcons = "navbar-iconsLogued";
      } else {
        this.classNavBarIcons = "navbar-iconsNoLogued";
      }
    },
  },
  computed: {
    ...mapState({
      logued: (state) => state.logued,
    }),
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
}
.navbar-iconsLogued {
  width: 93%;
  display: flex;
  justify-content: space-evenly;
}
.navbar-iconsNoLogued {
  width: 93%;
  display: flex;
}
.menu-button {
  display: none;
  font-size: 25px;
  cursor: pointer;
}
.navbar-logo {
  width: 98%;
  display: flex;
}
.img-logo {
  border-radius: 91px;
  width: 150px;
}
.btn-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  max-width: 12vw;
  height: 6vh;
  background-color: #003366;
  text-decoration: none;
  color: #ffffff;
  font-size: 15px;
  border-radius: 5px;
}
.fa-solid fa-house .navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  background-color: #f1f1f1;
}

.mobile-menu {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #003366;
  border: 0.5px solid #000000;
  border-radius: 5px;
  z-index: 1;
}

.mobile-menu-item {
  text-decoration: none;
  color: white;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s;
}

.slide-enter-to,
.slide-leave {
  transition: transform 1s;
  transform: translateX(0);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Media query para mostrar el botón de menú hamburguesa en pantallas pequeñas */
@media screen and (max-width: 782px) {
  .navbar {
    padding: 1rem;
    background-color: transparent;
  }
  .navbar-iconsLogued {
    display: none;
  }
  .navbar-iconsNoLogued {
    display: none;
  }
  .menu-button {
    display: block;
  }
  .navbar-logo {
    display: none;
  }

  .navbar-icons {
    display: none;
  }
}
</style>
