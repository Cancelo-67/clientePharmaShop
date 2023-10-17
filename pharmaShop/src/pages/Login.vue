<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario logueado</h2>
      <p>Bienvenido a PharmaShop {{ formData.email }}!</p>
    </div>
  </div>
  <div class="popup" v-if="badPopup">
    <div class="popup-content">
      <h2>Usuario incorrecto</h2>
      <p>Vuelva a introducir las credenciales</p>
    </div>
  </div>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Iniciar de Sesion</h1>
      <div class="form-group">
        <label for="username">Correo Electronico</label>
        <input type="text" id="username" v-model="formData.email" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>
      <router-link to="/register">
        <p>¿Has olvidado tu documentacion?</p>
      </router-link>
      <button type="submit">Iniciar Sesion</button>
      <p>O si lo prefieres</p>
      <button>
        <i class="fa-brands fa-google"></i>
        <p>Acceder con Google</p>
      </button>
      <p>¿Eres un nuevo cliente?</p>
      <p>Crea una nueva cuenta pulsando aqui</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // Creo un objeto que contiene los datos del formulario
      formData: {
        username: "",
        email: "",
        password: "",
      },
      // Creo una lista que contiene los usuarios
      users: [],
      // Creo dos variables para que se muestre el popup correcto
      goodPopup: false,
      badPopup: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        this.users = response.data.users;
        console.log(this.users);
      } catch (error) {
        console.error(error);
      }
    },
    async submitForm() {
      try {
        const userExists = this.users.some(
          (user) => user.email === this.formData.email
        );
        const emailExists = this.users.some(
          (user) => user.email === this.formData.email
        );
        const passwordExists = this.users.some(
          (user) => user.password === this.formData.password
        );
        if (!emailExists && !passwordExists) {
          this.badPopup = true;
          setTimeout(() => {
            this.badPopup = false;
          }, 1800);
        } else {
          this.goodPopup = true;
          setTimeout(() => {
            this.goodPopup = false;
            this.$router.push("/");
          }, 1800);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
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
  height: 90%;
  width: 29%;
  background-color: #003366;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #fff;
  border-radius: 5%;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 10px;
  margin-bottom: 7%;
}

input {
  background-color: #0056b3;
  border-radius: 4px;
  border: 1px solid;
  color: #fff;
}

button {
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10%;
  width: 35%;
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
}
</style>
