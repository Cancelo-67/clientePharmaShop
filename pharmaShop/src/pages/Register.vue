<template>
  <div class="popup" v-if="goodPopup">
    <div class="popup-content">
      <h2>Usuario creado</h2>
      <p>Bienvenido a PharmaShop!</p>
    </div>
  </div>
  <div class="popup" v-if="badPopup">
    <div class="popup-content">
      <h2>Usuario no creado</h2>
      <p>Vuelva a introducir las credenciales</p>
    </div>
  </div>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Registrarse</h1>
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" id="username" v-model="formData.username" />
      </div>

      <div class="form-group">
        <label for="surname">Apellido</label>
        <input type="text" id="surname" v-model="formData.surname" />
      </div>

      <div class="form-group">
        <label for="phoneNumber">Número de teléfono</label>
        <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="formData.email" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" id="address" v-model="formData.address" />
      </div>

      <button type="submit">Registrarse</button>
      <p>O si lo prefieres</p>
      <button>
        <i class="fa-brands fa-google"></i>
        <p>Acceder con Google</p>
      </button>
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
        surname: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: "",
      },
      // Creo una lista que contiene los usuarios
      users: [],
      // Creo dos variables para que se muestre el popup correcto dependiento del momento
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
  padding: 2rem;
  a {
    p {
      text-decoration: none;
      color: #fff;
    }
  }
}

form {
  width: 100%;
  max-width: 450px;
  background-color: #003366;
  padding: 1rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
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

/* @media para hacer que el formulario sea responsive */
@media (max-width: 768px) {
  form {
    max-width: 60%;
    padding: 1rem;
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
@media (max-width: 548px) {
  form {
    max-width: 100%;
  }
}
</style>
