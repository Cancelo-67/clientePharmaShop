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

  <div class="prueba">
    <img src="../images/logo-transparent.png" alt="Imagen logo" />
    <div class="container">
      <form @submit.prevent="submitForm">
        <h1>Crear cuenta</h1>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Crear cuenta con Google
        </button>
        <div class="separator-container">
          <hr class="separator-horizontal" />
          <p class="inline-text">O bien</p>
          <hr class="separator-horizontal" />
        </div>
        <input type="text" placeholder="Nombre" v-model="formData.username" />
        <input
          type="text"
          placeholder="Correo Electronico"
          v-model="formData.email"
        />
        <input
          type="text"
          placeholder="Contraseña"
          v-model="formData.password"
        />
        <input
          type="text"
          placeholder="Repetir Contraseña"
          v-model="repeatPassword"
        />
        <div class="checkbox">
          <input
            type="checkbox"
            id="privacyPolicy"
            v-model="acceptPrivacyPolicy"
          />
          <label for="privacyPolicy"
            >He leído y acepto la política de privacidad</label
          >
        </div>

        <button>Crear cuenta</button>
        <div class="separator-container">
          <hr class="separator-horizontal" />
          <p class="inline-text">O bien</p>
          <hr class="separator-horizontal" />
        </div>
        <button @click="goLogin()">Iniciar Sesion</button>
      </form>
      <hr class="separator-vertical" />
      <div class="container-word">
        <i class="fa-solid fa-truck" style="color: #41aba9"></i>
        <div class="div1">
          <h2>Gestiona tus pedidos</h2>
          <p>
            Ten el control de todos tus pedidos y recibe notificaciones con el
            seguimiento
          </p>
        </div>
        <i class="fa-solid fa-medal" style="color: #41aba9"></i>
        <div class="div2">
          <h2>Lista de deseos personalizada</h2>
          <p>
            Guarda tus productos favoritos en las listas de deseos
            personalizadas
          </p>
        </div>
      </div>
    </div>
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
    goLogin() {
      this.$router.push("/login");
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8080/users");
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

<style lang="scss" scoped>
.prueba {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../images/fondo1.png");
  background-repeat: no-repeat;
  background-size: cover;
  img {
    width: 222px;
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    height: 100vh;
    padding: 2rem;
    form {
      width: 100%;
      max-width: 450px;
      padding: 1rem;
      border-radius: 5px;
      color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 75vh;
      div {
        width: 10vw;
        display: flex;
      }
      .checkbox {
        width: 20%;
      }
      .checkbox {
        display: flex;
        align-items: center;
        margin-top: 1rem;
      }

      .checkbox input {
        margin-right: 0.5rem;
      }

      .checkbox label {
        font-size: 14px;
        color: #000;
      }
    }
    .separator-vertical {
      margin: 2rem;
      border-top: 2px solid #41aba9;
    }
    .separator-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 25vw;
    }

    .separator-horizontal {
      flex-grow: 1;
      height: 1px;
      border-top: 2px solid #41aba9;
      margin: 0 10px;
    }

    .inline-text {
      white-space: nowrap;
      font-size: 14px;
      margin: 0;
    }
    .container-word {
      .fa-medal,
      .fa-truck {
        font-size: 42px;
      }
    }
  }
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
  font-size: 14px;
  margin-bottom: 0.5rem;
}

input {
  width: 300px;
  border-radius: 5px;
  border: 1px solid;
  color: #000000;
  padding: 0.7rem;
  font-size: 14px;
}

button {
  padding: 1rem 2rem;
  background-color: #41aba9;
  color: #000000;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  svg {
    width: 40px;
    height: 35px;
  }
}

.google-login {
  display: flex;
  align-items: center;
}

.google-login i {
  font-size: 20px;
  margin-right: 0.5rem;
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
