<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="profile-title">Mi Perfil</h1>
      </div>
      <form @submit.prevent="submitForm" class="profile-form">
        <div class="form-group">
          <label for="username">Nombre de usuario*</label>
          <input type="text" id="username" v-model="userLogued.username" />
          <div
            class="error-message"
            v-if="usernameErrorMessage && !isUsernameValid"
          >
            {{ usernameErrorMessage }}
          </div>
        </div>
        <div class="form-group">
          <label for="name">Nombre*</label>
          <input
            type="text"
            id="name"
            v-model="userLogued.name"
            @change="validateName"
          />
          <div class="error-message" v-if="nameErrorMessage && !isNameValid">
            {{ nameErrorMessage }}
          </div>
        </div>
        <div class="form-group">
          <label for="surname">Apellido*</label>
          <input type="text" id="surname" v-model="userLogued.surname" />
          <div
            class="error-message"
            v-if="surnameErrorMessage && !isSurnameValid"
          >
            {{ surnameErrorMessage }}
          </div>
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico*</label>
          <input type="email" id="email" v-model="userLogued.email" />
          <div class="error-message" v-if="emailErrorMessage && !isEmailValid">
            {{ emailErrorMessage }}
          </div>
        </div>
        <div class="form-group">
          <label>Fecha de Nacimiento*</label>
          <div class="date-group">
            <input
              type="text"
              class="date-input"
              v-model="selectedDay"
              placeholder="Día"
            />
            <input
              type="text"
              class="date-input"
              v-model="selectedMonth"
              placeholder="Mes"
            />
            <input
              type="text"
              class="date-input"
              v-model="selectedYear"
              placeholder="Año"
            />
          </div>
        </div>
        <div class="password-group">
          <div class="form-group">
            <label for="current-password">Contraseña*</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password1"
              v-model="newPassword"
            />
            <span class="toggle-password" @click="togglePasswordVisibility1">
              <i
                class="fa"
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
            </span>
            <div
              class="error-message"
              v-if="passwordErrorMessage && !isPasswordValid"
            >
              {{ passwordErrorMessage }}
            </div>
          </div>
        </div>
        <button type="submit" class="save-button">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      userLogued: {},
      userToken: JSON.parse(decodeURIComponent(Cookies.get("userToken"))),
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null,
      passwordNew: "",
      showPassword: false,
      usernameErrorMessage: "",
      nameErrorMessage: "",
      surnameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  computed: {
    days() {
      return [...Array(31).keys()].map((day) => day + 1);
    },
    months() {
      return [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
    },
    years() {
      const currentYear = new Date().getFullYear();
      return [...Array(100).keys()].map((year) => currentYear - year);
    },
    isUsernameValid() {
      return /^[a-zA-Z0-9_]{3,16}$/.test(this.formData.username);
    },
    isNameValid() {
      return /^[A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}( [A-Za-zÁÉÍÓÚáéíóúüÜ]{3,15}){0,1}$/.test(
        this.formData.name
      );
    },
    isSurnameValid() {
      return /^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(this.formData.surname);
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
    },
    isPasswordValid() {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%]).{8,24}$/.test(
        this.formData.password
      );
    },
  },
  methods: {
    validateUsername() {
      this.usernameErrorMessage = "";
      if (!this.isUsernameValid) {
        this.usernameErrorMessage =
          "Por favor, complete el Nombre de Usuario correctamente.";
      }
    },
    validateName() {
      if (!this.isNameValid) {
        this.nameErrorMessage = "Por favor, complete el Nombre correctamente.";
      } else {
        this.nameErrorMessage = "";
      }
    },
    validateSurname() {
      this.surnameErrorMessage = "";
      if (!this.isSurnameValid) {
        this.surnameErrorMessage =
          "Por favor, complete los Apellidos correctamente.";
      }
    },
    validateEmail() {
      this.emailErrorMessage = "";
      if (!this.isEmailValid) {
        this.emailErrorMessage = "Por favor, complete el Email correctamente.";
      }
    },
    validatePassword() {
      this.passwordErrorMessage = "";
      if (!this.isPasswordValid) {
        this.passwordErrorMessage =
          "Por favor, complete la Contraseña correctamente.";
      }
    },
    validateRepeatPassword() {
      this.errorMessage = "";
      if (this.formData.password !== this.repeatPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
      }
    },
    togglePasswordVisibility1() {
      this.showPassword = !this.showPassword;
    },
    initializeUserData() {
      this.userLogued = JSON.parse(
        decodeURIComponent(Cookies.get("userLogued"))
      );
      this.selectedDay = this.extractDay(this.userLogued.birthdate);
      this.selectedMonth = this.extractMonth(this.userLogued.birthdate);
      this.selectedYear = this.extractYear(this.userLogued.birthdate);
    },
    extractDay(date) {
      return date ? parseInt(date.split("/")[0]) : null;
    },
    extractMonth(date) {
      return date ? parseInt(date.split("/")[1]) : null;
    },
    extractYear(date) {
      return date ? parseInt(date.split("/")[2]) : null;
    },

    async submitForm() {
      if (
        this.usernameErrorMessage ||
        this.nameErrorMessage ||
        this.surnameErrorMessage ||
        this.emailErrorMessage ||
        this.passwordErrorMessage
      ) {
        return;
      }
      this.userLogued.password = this.newPassword;
      const response = await axios.put(
        `http://localhost:8080/users/${this.userLogued.id}`,
        this.userLogued,
        {
          headers: { Authorization: `Bearer ${this.userToken}` },
        }
      );
      console.log(response);
    },
  },
  mounted() {
    this.initializeUserData();
  },
};
</script>
<style lang="scss" scoped>
/* Estilos para el contenedor principal */

.profile-wrapper {
  width: 100vw;
}
.profile-container {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex-direction: column;
  align-items: center;
}

/* Estilos para el encabezado */
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

/* Estilos para el título */
.profile-title {
  color: #333;
  font-size: 24px;
}

.profile-form {
  width: 100%;
  max-width: 600px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-size: 16px;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input[type="password"] {
  width: calc(100% - 35px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.date-group {
  display: flex;
}

.date-input {
  flex: 1;
  margin-right: 10px;
}

/* Estilos para los mensajes de error */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

/* Estilos para el botón de guardar */
.save-button {
  padding: 12px 20px;
  background-color: #41aba9;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #368e8d;
}

.toggle-password {
  display: inline-block;
  position: relative;
  top: -2px;
  margin-left: -30px;
  cursor: pointer;
}

.toggle-password i {
  font-size: 18px;
  color: #666;
}

@media screen and (max-width: 768px) {
  input[type="password"] {
    width: calc(100% - 45px);
  }
}
</style>
