<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Mis datos</h1>
      <p>* Campo Obligatorio</p>
      <div class="form-group1">
        <label>Género:</label>
        <div class="radio-options">
          <input
            type="radio"
            id="hombre"
            name="genero"
            value="hombre"
            v-model="userLogued.gender"
          />
          <label for="hombre">Hombre</label>

          <input
            type="radio"
            id="mujer"
            name="genero"
            value="mujer"
            v-model="userLogued.gender"
          />
          <label for="mujer">Mujer</label>

          <input
            type="radio"
            id="otro"
            name="genero"
            value="otro"
            v-model="userLogued.gender"
          />
          <label for="otro">Otro</label>
        </div>
      </div>
      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input type="text" id="username" v-model="userLogued.username" />
      </div>

      <div class="form-group">
        <label for="surname">Apellido</label>
        <input type="text" id="surname" v-model="userLogued.surname" />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="userLogued.email" />
      </div>
      <div class="div-nac">
        <p>Fecha de nacimiento</p>
        <div class="div-nacGroup">
          <div class="form-group">
            <select id="day" v-model="selectedDay">
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <select id="month" v-model="selectedMonth">
              <option
                v-for="(month, index) in months"
                :key="index + 1"
                :value="index + 1"
              >
                {{ month }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <select id="year" v-model="selectedYear">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="username">Contraseña Actual</label>
        <input type="text" id="username" />
      </div>
      <div class="form-group">
        <label for="username">Nueva Contraseña</label>
        <input type="text" id="username" />
      </div>
      <div class="form-group">
        <label for="username">Confirmar Contraseña</label>
        <input type="text" id="username" />
      </div>
      <button type="submit">Guardar</button>
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
  },
  methods: {
    initializeUserData() {
      // Inicializa el usuario después de cargar los datos
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
      console.log(this.userLogued);
      // Agrega la lógica para enviar el formulario
    },
    deleteUser() {
      // Agrega la lógica para eliminar el usuario
    },
  },
  mounted() {
    // Llama a initializeUserData después de que el componente está montado
    this.initializeUserData();
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
  background-color: #c5c5c5;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-evenly;
  border-radius: 5px;
  color: #000000;
  h1 {
    width: 384px;
  }
}

.radio-options {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Opcional: Estilos para resaltar la opción seleccionada */

.form-group {
  width: 90%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.form-group1 {
  width: 20%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

// label {
//   font-size: 14px;
//   margin-bottom: 0.5rem;
// }

input {
  border-radius: 5px;
  border: 1px solid;
  color: #000000;
  padding: 0.3rem;
  font-size: 14px;
}
.div-nac {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.div-nacGroup {
  width: 35%;
  display: flex;
  justify-content: space-between;
}
select {
  display: flex;
  justify-content: center;
  background-color: #d9d9d9;
  border-radius: 7px;
  border: none;
}

button {
  padding: 1rem 2rem;
  background-color: #41aba9;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
