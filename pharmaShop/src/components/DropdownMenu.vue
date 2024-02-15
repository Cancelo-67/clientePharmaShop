<template>
  <div v-show="isOpen" class="dropdown-menu" @transitionend="transitionEnd">
    <div class="dropdown-container">
      <button @click="closeMenu" class="close-button">X</button>
      <div class="options-container">
        <h1 class="title">Mi cuenta</h1>
        <ul class="list-subtittle">
          <li @click="toggleDropdown('miCuenta')">
            <span class="menu-item-header"
              ><i class="fa-solid fa-user" style="color: #ffffff"></i>Mi
              cuenta</span
            >
            <div v-show="dropdowns.miCuenta" class="submenu">
              <router-link to="/profile"
                ><p class="submenu-item">Mis Datos</p></router-link
              >
              <p class="submenu-item">Mis Direcciones</p>
              <p class="submenu-item">Favoritos</p>
            </div>
          </li>

          <li @click="toggleDropdown('pedidos')">
            <span class="menu-item-header"
              ><i class="fa-solid fa-box" style="color: #ffffff"></i> Pedidos y
              devoluciones</span
            >
            <div v-show="dropdowns.pedidos" class="submenu">
              <p class="submenu-item">Pedidos, devoluciones y facturas</p>
            </div>
          </li>

          <li @click="toggleDropdown('pago')">
            <span class="menu-item-header"
              ><i class="fa-solid fa-credit-card" style="color: #ffffff"></i
              >Pago</span
            >
            <div v-show="dropdowns.pago" class="submenu">
              <p class="submenu-item">Tarjetas Vinculadas</p>
              <p class="submenu-item">Cupones Descuento</p>
            </div>
          </li>
          <button @click="logOut" class="button-logout">
            <i class="fa-solid fa-right-from-bracket" style="color: #ffffff"></i
            >Cerrar Sesión
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdowns: {
        miCuenta: false,
        pedidos: false,
        pago: false,
      },
      transitioning: false,
    };
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    toggleDropdown(dropdownName) {
      for (const name in this.dropdowns) {
        if (name !== dropdownName) {
          this.dropdowns[name] = false;
        }
      }
      this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
      this.transitioning = true;
    },
    transitionEnd() {
      this.transitioning = false;
    },
    logOut() {
      Cookies.remove("userToken");
      Cookies.remove("userLogued");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.title {
  color: #ffffff;
  font-size: 30px;
  margin-right: 220px;
  margin-bottom: 27px;
}

.dropdown-menu {
  position: fixed;
  top: 26px;
  right: 0px;
  width: 440px;
  height: auto;
  background-color: #41aba9;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, height 0.3s ease;
  transform-origin: top center;
  transform: translateY(0);
  z-index: 1000;
}

.dropdown-container {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-logout {
  width: 150px;
  display: flex;
  font-size: 20px;
  color: #ffffff;
  background-color: transparent;
  border: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.options-container {
  margin-top: 70px;
  width: 140%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  flex-direction: column;
}

ul {
  height: 155px;
  display: flex;
  width: 50%;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.menu-item-header {
  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Noto Serif;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

.submenu {
  color: #ffffff;

  font-family: Noto Serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.submenu-item {
  margin-left: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #ffffff;
  outline: none;
}

.dropdown-menu[data-v-xxxxxxx] {
  transform: translateY(100%);
  height: auto;
}
</style>
