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
    <div class="navbar-icons">
      <!-- Usuario logueado -->
      <router-link v-if="logued" to="/profile" class="navbar-icon">
        <i class="fas fa-user"></i>
      </router-link>
      <router-link v-if="logued" to="/cart" class="navbar-icon">
        <i class="fas fa-shopping-cart"></i>
      </router-link>
      <router-link v-if="logued" to="/login" class="navbar-icon">
        <i @click="logOut" class="fa-solid fa-right-from-bracket"></i>
      </router-link>
      <!-- Usuario no logueado -->
      <router-link v-if="!logued" to="/login" class="login">
        <p>Iniciar sesión</p>
      </router-link>
      <router-link v-if="!logued" to="/register" class="register">
        <p>Registrarse</p>
      </router-link>
    </div>
    <!-- Botón de menú hamburguesa para dispositivos móviles -->
    <div class="menu-button" @click="toggleMobileMenu">
      <i class="fa-solid fa-bars"></i>
    </div>
    <!-- Menú desplegable para dispositivos móviles -->
    <transition name="slide">
      <div class="mobile-menu" v-if="showMobileMenu">
        <router-link to="/profile" class="mobile-menu-item" v-if="logued">
          Perfil
        </router-link>
        <router-link to="/cart" class="mobile-menu-item" v-if="logued">
          Carrito
        </router-link>
        <router-link to="/login" class="mobile-menu-item" v-if="logued">
          Cerrar Sesión
        </router-link>
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
      logued: false,
    };
  },
  methods: {
    ...mapMutations(["setLogued"]),
    changeValue() {
      this.setLogued(false);
      this.showMobileMenu = false; // Cerrar el menú en dispositivos móviles al cambiar de estado
      localStorage.removeItem("userLogued");
    },
    logOut() {
      this.changeValue();
      this.$router.push("/");
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
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
.menu-button {
  display: none; /* Ocultar en pantallas más grandes */
  font-size: 25px;
  cursor: pointer;
}
.navbar-logo {
}
.img-logo {
  border-radius: 91px;
  width: 150px;
}
.register {
  background-color: #003366;
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  padding: 0.3rem 0.7rem;
}
.register:hover {
  transition: 0.5s;
  color: white;
  background-color: #4a4646;
  border-radius: 10%;
}
.login {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  padding: 0.3rem 0.7rem;
}
.login:hover {
  transition: 0.5s;
  color: white;
  background-color: #4a4646;
  border-radius: 10%;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
}

.navbar-icons {
  /* Estilo de tus iconos de navegación */
  display: flex;
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

/* Estilos de la animación de deslizamiento */
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
@media screen and (max-width: 768px) {
  .navbar {
    background-color: transparent;
  }
  .menu-button {
    display: block;
  }
  .navbar-logo {
    /* Estilo de tu logotipo */
    display: none;
  }

  .navbar-icons {
    display: none; /* Ocultar iconos de navegación en pantallas pequeñas */
  }
}
</style>
