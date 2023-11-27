<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Mis datos</h1>
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" id="username" v-model="userData.username" />
      </div>

      <div class="form-group">
        <label for="surname">Apellido</label>
        <input type="text" id="surname" v-model="userData.surname" />
      </div>

      <div class="form-group">
        <label for="phoneNumber">Número de teléfono</label>
        <input type="tel" id="phoneNumber" v-model="userData.phoneNumber" />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="userData.email" />
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" id="address" v-model="userData.address" />
      </div>

      <div class="form-group">
        <label for="cp">C.P</label>
        <input type="text" id="cp" v-model="userData.cp" />
      </div>

      <button type="submit">Actualizar usuario</button>
      <button @click="deleteUser">Eliminar usuario</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "NombrePredeterminado",
        surname: "ApellidoPredeterminado",
        phoneNumber: "123-456-7890",
        email: "correo@predeterminado.com",
        address: "DirecciónPredeterminada",
        cp: "12345",
      },
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes enviar los datos del formulario
    },
    deleteUser() {
      // Agrega lógica para eliminar el usuario
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
form {
  width: 100%;
  max-width: 80%;
  background-color: #41aba9;
  padding: 1rem;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  h1 {
    width: 384px;
  }
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 0.5rem;
}

input {
  background-color: #0056b3;
  border-radius: 5px;
  border: 1px solid;
  color: #fff;
  padding: 0.3rem;
  font-size: 14px;
}

button {
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
