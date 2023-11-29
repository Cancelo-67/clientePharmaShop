<template>
  <div v-if="isOpen" class="dropdown-menu">
    <ul>
      <li @click="closeMenu">Opción 1</li>
      <li @click="closeMenu">Opción 2</li>
      <!-- Agrega más opciones según sea necesario -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #ddd;
}
</style>
