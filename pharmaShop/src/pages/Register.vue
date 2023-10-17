<template>
  <div class="container">
    <h1></h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" id="username" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" />
      </div>
      <router-link to="/register">
        <p class="btn">¿Aun no tienes cuenta?</p>
      </router-link>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
