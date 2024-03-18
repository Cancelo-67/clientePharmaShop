<template>
  <div class="profile-tab">
    <form @submit.prevent="submitForm" class="profile-form">
      <h1 class="profile-title">Mi Perfil</h1>
      <div class="form-group">
        <label for="username">Nombre de usuario*</label>
        <input type="text" id="username" v-model="userLogued.username" />
        <div
          class="errorMessage"
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
        <!-- Mensaje de error para el nombre -->
        <div class="errorMessage" v-if="nameErrorMessage && !isNameValid">
          {{ nameErrorMessage }}
        </div>
      </div>
      <div class="form-group">
        <label for="surname">Apellido*</label>
        <input type="text" id="surname" v-model="userLogued.surname" />
        <div class="errorMessage" v-if="surnameErrorMessage && !isSurnameValid">
          {{ surnameErrorMessage }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico*</label>
        <input type="email" id="email" v-model="userLogued.email" />
        <div class="errorMessage" v-if="emailErrorMessage && !isEmailValid">
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
            <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </span>
          <div
            class="errorMessage"
            v-if="passwordErrorMessage && !isPasswordValid"
          >
            {{ passwordErrorMessage }}
          </div>
        </div>
      </div>
      <button type="submit" class="save-button">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      userLogued: {},
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null,
      passwordNow: "",
      newPassword: "",
      confirmPassword: "",
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
        this.nameErrorMessage = ""; // Reiniciar el mensaje de error cuando el nombre es válido
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

    submitForm() {
      if (
        this.usernameErrorMessage ||
        this.nameErrorMessage ||
        this.surnameErrorMessage ||
        this.emailErrorMessage ||
        this.passwordErrorMessage
      ) {
        return;
      }

      console.log(this.userLogued);
    },
  },
  mounted() {
    this.initializeUserData();
  },
};
</script>

<style lang="scss" scoped>
.profile-tab {
  display: flex;
  justify-content: center;
}

.profile-form {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-title {
  margin-bottom: 2rem;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 16px;
}

input[type="text"],
input[type="email"] {
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input[type="password"] {
  width: 90%;
  margin-right: 10px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.date-group {
  display: flex;
}

.date-input {
  flex: 1;
  margin-right: 1rem;
}

.save-button {
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}

.toggle-password {
  cursor: pointer;
}

.toggle-password i {
  font-size: 18px;
  color: #666;
}

.errorMessage {
  color: red;
  font-size: 0.8em;
  margin-top: 0.2em;
  width: 60%;
}

@media screen and (max-width: 661px) {
  form {
    font-size: 1rem;
  }
}
</style>
