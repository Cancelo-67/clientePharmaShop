<template>
  <div v-show="isOpen" class="dropdown-menu">
    <div class="dropdown-container">
      <button @click="closeMenu" class="close-button">X</button>
      <div class="options-container">
        <ul>
          <li @click="closeMenu">Mi cuenta</li>
          <li @click="closeMenu">Pedidos y devoluciones</li>
          <!-- Agrega más opciones según sea necesario -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  position: fixed;
  top: 26px;
  right: 0px;
  width: 440px;
  height: 100%; /* Ajusta la altura según sea necesario */
  background-color: #41aba9;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.dropdown-container {
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.options-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: black;
  outline: none;
}
</style>
