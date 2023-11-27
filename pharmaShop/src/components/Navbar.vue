<template>
  <div class="navbar">
    <nav class="navbar-up">
      <div>
        <p>PharmaShop-Lideres en confianza</p>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
      </div>
      <div>
        <i class="fa-solid fa-truck-fast" style="color: #ffffff"></i>
        <p>Tus productos en casa en solo 24 - 48 horas</p>
      </div>
      <div>
        <i class="fa-solid fa-phone" style="color: #ffffff"></i>
        <p>111 111 111</p>
        <i class="fa-brands fa-whatsapp" style="color: #ffffff"></i>
        <p>111 111 111</p>
      </div>
    </nav>
    <nav class="navbar-center">
      <i class="fa-regular fa-circle-question" style="color: #41aba9"></i>
      <button>Información</button>
      <i class="fa-solid fa-user" style="color: #41aba9"></i>
      <button>{{ username }}</button>
    </nav>
    <div class="navbar-down">
      <router-link to="/" class="logo-link">
        <img src="../images/logo-transparent.png" alt="Logo" class="img-logo" />
      </router-link>
      <i class="fa-solid fa-cart-shopping" style="color: #41aba9"></i>
    </div>
    <div class="div-table">
      <table class="table-category">
        <tr>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Dental' } }"
              class="custom-link"
              >Dental</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Cosmetica' } }"
              class="custom-link"
              >Cosmética</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Nutricion' } }"
              class="custom-link"
              >Nutrición</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Bebeymama' } }"
              class="custom-link"
              >Bebé y Mamá</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Salud' } }"
              class="custom-link"
              >Salud</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Higiene' } }"
              class="custom-link"
              >Higiene</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Optica' } }"
              class="custom-link"
              >Óptica</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Ortopedia' } }"
              class="custom-link"
              >Ortopedia</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Mascotas' } }"
              class="custom-link"
              >Mascotas</router-link
            >
          </th>
          <th>
            <router-link
              :to="{ name: 'Category', params: { category: 'Medicamentos' } }"
              class="custom-link"
              >Medicamentos</router-link
            >
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    // Verificar si hay un objeto de usuario almacenado en la cookie al cargar el componente
    const userObjectFromCookie = Cookies.get("userLogued");
    if (userObjectFromCookie) {
      const userObject = JSON.parse(userObjectFromCookie);
      this.username = userObject.username;
    }
  },
  methods: {
    goLogin() {
      // Redirigir a la página de inicio de sesión
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-image: url("../images/fondo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.navbar-up {
  padding: 4px;
  color: white;
  background-color: #41aba9;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  div:last-child {
    display: flex;
    justify-content: space-between;
    width: 17%;
  }
}
.navbar-center {
  padding-top: 4px;
  width: 98vw;
  display: flex;
  justify-content: flex-end;
  button {
    color: gray;
    background-color: transparent;
    border: none;
  }
}
.div-table {
  width: 100vw;
  display: flex;
  justify-content: center;
  .table-category {
    width: 90vw;
    border: 2px solid #41aba9;
    tr {
      th {
        padding: 1em;
        border: 2px solid #41aba9;
      }
    }
  }
}
.custom-link {
  color: black; /* Cambia el color a tu preferencia */
  text-decoration: none; /* Elimina el subrayado predeterminado */
}

.navbar-down {
  width: 91vw;
  height: 13vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    font-size: 45px;
  }
}
.logo-link {
  text-decoration: none;
}

.img-logo {
  width: 40%; /* Ajusta el tamaño del logo según tus necesidades */
  height: auto; /* Esto mantiene la proporción del logo */
}

@media (max-width: 768px) {
  .navbar-up {
    flex-direction: column;
    align-items: center;
    div:last-child {
      width: 100%; /* Ocupa todo el ancho en dispositivos móviles */
      margin-top: 10px; /* Espaciado entre las secciones */
    }
  }
  .navbar-center {
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 10px; /* Espaciado entre los botones */
    }
  }
  .navbar-down {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80%; /* Ajusta el tamaño del logo en dispositivos móviles */
    }
    i {
      margin-top: 10px; /* Espaciado entre el logo y el icono de carrito */
    }
  }
  .div-table {
    width: 100%;
    overflow-x: auto; /* Agrega una barra de desplazamiento horizontal si es necesario */
    .table-category {
      width: 100%;
      tr {
        th {
          white-space: nowrap; /* Evita que el texto se desborde en dispositivos móviles */
        }
      }
    }
  }
}
</style>
