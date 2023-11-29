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
        <h1>Iniciar sesión</h1>
        <button>
          <i class="fa-brands fa-google" style="color: #000000"> </i>Iniciar
          Sesión con Google
        </button>
        <div>
          <hr class="separator-horizontal" />
          <p>O bien</p>
          <hr class="separator-horizontal" />
        </div>

        <input
          type="text"
          v-model="formData.email"
          placeholder="Correo Electrónico"
        />
        <input
          type="password"
          v-model="formData.password"
          placeholder="Contraseña"
        />
        <p>He olvidado mi contraseña</p>
        <button type="submit">Iniciar Sesión</button>
        <div class="separator-container">
          <hr class="separator-horizontal" />
          <p class="inline-text">¿Eres nuevo cliente?</p>
          <hr class="separator-horizontal" />
        </div>
        <button @click="goRegister()">Crear cuenta</button>
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
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        token: "",
      },
      goodPopup: false,
      badPopup: false,
      users: [],
    };
  },

  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    async submitForm() {
      try {
        const responseToken = await axios.post(
          "http://localhost:8080/token",
          {},
          {
            auth: {
              username: this.formData.email,
              password: this.formData.password,
            },
          }
        );

        this.formData.token = responseToken.data;

        const responseUser = await axios.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${this.formData.token}`,
          },
        });

        // Almacena la lista completa de usuarios en la propiedad users
        this.users = responseUser.data;

        // Busca el usuario específico por nombre de usuario
        const user = this.users.find(
          (user) => user.username === this.formData.email
        );
        if (
          user &&
          this.comparePasswords(this.formData.password, user.password)
        ) {
          this.goodPopup = true;
          setTimeout(() => {
            this.goodPopup = false;
            // Si el usuario existe y las contraseñas coinciden
            Cookies.set("userLogued", JSON.stringify(user));
            Cookies.set("userToken", JSON.stringify(this.formData.token));
            this.$router.push("/");
          }, 2000);
        } else {
          this.badPopup = true;
          setTimeout(() => {
            this.badPopup = false;
            this.$router.push("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    comparePasswords(inputPassword, hashedPassword) {
      // Compara la contraseña ingresada con la contraseña almacenada
      return bcrypt.compareSync(inputPassword, hashedPassword);
    },
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
    }
    .separator-vertical {
      margin: 2rem; /* Ajusta según sea necesario */
      border-top: 2px solid #41aba9; /* Color y estilo de la línea */
    }
    .separator-container {
      display: flex;
      align-items: center;
      justify-content: center; /* Centra los elementos horizontalmente */
      margin: 1rem 0; /* Ajusta el margen según sea necesario */
      width: 25vw;
    }

    .separator-horizontal {
      flex-grow: 1;
      height: 1px;
      border-top: 2px solid #41aba9; /* Ajusta el color según sea necesario */
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
@media screen and (max-width: 1090px) {
  .container {
    flex-direction: column; /* Cambia la dirección del contenedor a columna */
  }

  form {
    width: 100%; /* Ajusta el ancho del formulario al 100% en pantallas pequeñas */
    max-width: none; /* Elimina la restricción máxima de ancho */
  }

  input {
    width: 100%; /* Ajusta el ancho de los campos de entrada al 100% en pantallas pequeñas */
  }

  .separator-container {
    width: 100%; /* Ajusta el ancho del contenedor de separadores al 100% en pantallas pequeñas */
  }

  .container-word {
    .div1,
    .div2 {
      text-align: center; /* Centra el texto en las secciones de la palabra */
    }

    .fa-medal,
    .fa-truck {
      font-size: 24px; /* Reduzca el tamaño del ícono en pantallas pequeñas */
    }
  }
}
</style>
