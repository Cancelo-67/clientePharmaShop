<template>
  <div class="container">
    <h1>Inicio de Sesion</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
        />
      </div>
      <router-link to="/register">
        <p class="btn">¿Aun no tienes cuenta?</p>
      </router-link>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  transition: 0.5s;
  border: none;
  background-color: #0056b3;
  border-radius: 20%;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}</style>
