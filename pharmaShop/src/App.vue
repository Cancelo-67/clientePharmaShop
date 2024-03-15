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
      this.showNavbar = !to.meta.hideNavbar;
    },
  },
};
</script>

<style>
.div-app {
  width: 100vw;

  background-image: url("../src/images/fondo1.jpeg");
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
  font-family: "Circular", sans-serif;
}
</style>
