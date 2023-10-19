<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario logueado</h2>
      <p>Bienvenido a PharmaShop!</p>
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
      <h1>Iniciar Sesión</h1>
      <div class="form-group">
        <label for="username">Correo Electrónico</label>
        <input type="text" id="username" v-model="formData.email" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>
      <button type="submit">Iniciar Sesión</button>
      <p>O si lo prefieres</p>
      <button class="google-login">
        <i class="fa-brands fa-google"></i>
        <p>Acceder con Google</p>
      </button>
      <p>¿Eres un nuevo cliente?</p>
      <router-link to="/register" class="spec">
        <p>Crea una nueva cuenta pulsando aquí</p>
      </router-link>
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
        const response = await axios.get("https://dummyjson.com/users"); //https://dummyjson.com/users
        this.users = response.data.users;
        console.log(this.users);
      } catch (error) {
        console.error(error);
      }
    },
    async submitForm() {
      try {
        const userExists = this.users.find(
          (user) =>
            user.email === this.formData.email &&
            user.password === this.formData.password
        );
        if (!userExists) {
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
  padding: 2rem; /* Agregar espacio alrededor del formulario */
}

form {
  width: 100%;
  max-width: 450px; /* Limitar el ancho del formulario en pantallas grandes */
  background-color: #003366;
  padding: 1rem; /* Agregar espacio dentro del formulario */
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.spec {
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px; /* Aumentar el tamaño de la fuente de las etiquetas */
  margin-bottom: 0.5rem; /* Reducir el espacio entre etiquetas y campos de entrada */
}

input {
  background-color: #0056b3;
  border-radius: 5px;
  border: 1px solid;
  color: #fff;
  padding: 0.3rem; /* Aumentar el espacio interno de los campos de entrada */
  font-size: 14px; /* Aumentar el tamaño de la fuente de los campos de entrada */
}

button {
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px; /* Aumentar el tamaño de la fuente del botón */
  margin-top: 1rem; /* Agregar espacio entre el botón y los campos de entrada */
  margin-bottom: 1rem;
}

.google-login {
  display: flex;
  align-items: center;
}

.google-login i {
  font-size: 20px; /* Aumentar el tamaño del ícono de Google */
  margin-right: 0.5rem; /* Agregar espacio entre el ícono y el texto */
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
  border-radius: 5px;
  text-align: center;
}

/* Estilos para hacer la página responsive */
@media screen and (max-width: 768px) {
  .container {
    padding: 1rem; /* Reducir el espacio alrededor del formulario en pantallas pequeñas */
  }

  form {
    padding: 1rem; /* Reducir el espacio dentro del formulario en pantallas pequeñas */
  }

  label {
    font-size: 16px; /* Aumentar el tamaño de la fuente de las etiquetas en pantallas pequeñas */
  }

  input {
    font-size: 16px; /* Aumentar el tamaño de la fuente de los campos de entrada en pantallas pequeñas */
  }

  button {
    font-size: 16px; /* Aumentar el tamaño de la fuente del botón en pantallas pequeñas */
  }
}
</style>
