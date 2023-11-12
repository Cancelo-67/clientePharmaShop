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
        <h1>Iniciar sesion</h1>
        <button>
          <i class="fa-brands fa-google" style="color: #000000"></i>Iniciar
          Sesion con Google
        </button>
        <div>
          <hr class="separator-horizontal" />
          <p>O bien</p>
          <hr class="separator-horizontal" />
        </div>

        <input type="text" value="Correo Electronico" />
        <input type="text" value="Contraseña" />
        <p>He olvidado mi contraseña</p>
        <button>Iniciar Sesion</button>
        <div class="separator-container">
          <hr class="separator-horizontal" />
          <p class="inline-text">¿Eres nuevo cliente?</p>
          <hr class="separator-horizontal" />
        </div>
        <button>Crear cuenta</button>
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
    padding: 2rem; /* Agregar espacio alrededor del formulario */
    form {
      width: 100%;
      max-width: 450px; /* Limitar el ancho del formulario en pantallas grandes */
      padding: 1rem; /* Agregar espacio dentro del formulario */
      border-radius: 5px;
      color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      div {
        width: 10vw;
        display: flex;
      }
    }
    .separator-vertical {
      margin: 2rem; /* Ajusta según sea necesario */
      border-top: 1px solid #41aba9; /* Color y estilo de la línea */
    }
    .separator-container {
      display: flex;
      align-items: center;
    }

    .separator-horizontal {
      flex-grow: 1;
      height: 1px;
      background-color: #000; /* Ajusta el color según tu diseño */
      margin: 0 10px; /* Ajusta el margen según sea necesario */
    }

    .inline-text {
      white-space: nowrap;
      margin: 0 10px; /* Ajusta el margen según sea necesario */
    }
    .container-word {
      .fa-medal,
      .fa-truck {
        font-size: 42px; /* Tamaño deseado */
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
  font-size: 14px; /* Aumentar el tamaño de la fuente de las etiquetas */
  margin-bottom: 0.5rem; /* Reducir el espacio entre etiquetas y campos de entrada */
}

input {
  width: 300px;
  border-radius: 5px;
  border: 1px solid;
  color: #000000;
  padding: 0.7rem; /* Aumentar el espacio interno de los campos de entrada */
  font-size: 14px; /* Aumentar el tamaño de la fuente de los campos de entrada */
}

button {
  padding: 1rem 2rem;
  background-color: #41aba9;
  color: #000000;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px; /* Aumentar el tamaño de la fuente del botón */
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
