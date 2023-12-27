<template>
  <div class="div-app">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      showNavbar: true,
    };
  },
  watch: {
    $route(to, from) {
      // Puedes personalizar esta lógica según tus necesidades.
      this.showNavbar = !to.meta.hideNavbar;
    },
  },
};
</script>

<style>
.div-app {
  background-image: url("../src/images/fondo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 970px;
}
::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Serif";
}
</style>
