<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "NavBar",
  components: {
    Navbar,
  },
};
</script>

<style>

::-webkit-scrollbar {
    display: none;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
