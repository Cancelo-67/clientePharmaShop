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
        <article class="article-up">
          <i class="fa-solid fa-phone" style="color: #ffffff"></i>
          <p>111 111 111</p>
        </article>
        <article class="article-up">
          <i class="fa-brands fa-whatsapp" style="color: #ffffff"></i>
          <p>111 111 111</p>
        </article>
      </div>
    </nav>
    <nav class="navbar-center">
      <article class="article-center1">
        <i class="fa-regular fa-circle-question" style="color: #41aba9"></i>
        <button>Información</button>
      </article>
      <article class="article-center2">
        <!-- DropdownMenu se mostrará cuando isMenuOpen sea true -->
        <dropdown-menu v-if="isMenuOpen" @closeMenu="closeMenu"></dropdown-menu>
        <i class="fa-solid fa-user" style="color: #41aba9"></i>
        <button @click="toggleMenu">{{ username }}</button>
      </article>
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
          <th
            v-for="category in categories"
            :key="category"
            :class="{ 'active-category': currentCategory === category }"
          >
            <router-link
              :to="{ name: 'Category', params: { category: category } }"
              class="custom-link"
              @click="updateCurrentCategory(category)"
              >{{ category }}</router-link
            >
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import DropdownMenu from "./DropdownMenu.vue";

export default {
  components: {
    DropdownMenu,
  },
  data() {
    return {
      username: "",
      isMenuOpen: false,
      currentCategory: "",
      categories: [
        "Dental",
        "Cosmetica",
        "Nutricion",
        "Bebe y mama",
        "Salud",
        "Higiene",
        "Optica",
        "Ortopedia",
        "Mascotas",
        "Medicamentos",
      ],
    };
  },
  mounted() {
    const userObjectFromCookie = Cookies.get("userLogued");
    if (userObjectFromCookie) {
      const userObject = JSON.parse(userObjectFromCookie);
      this.username = userObject.username;
    }
    this.currentCategory = this.$route.params.category;
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    updateCurrentCategory(category) {
      this.currentCategory = category;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    width: 16%;
  }
}

.article-up {
  display: flex;
  align-items: center;
  width: 50%;
  display: flex;
}
.custom-link {
  color: black;
  text-decoration: none;
}

.active-category {
  background-color: #66e0ca; // Color de resaltado para la categoría actual
  color: white; // Color de texto para la categoría actual
}
.navbar-center {
  padding-top: 4px;
  width: 98vw;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 3px;
    color: gray;
    background-color: transparent;
    border: none;
  }
}

.article-center1 {
  margin-right: 20px;
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
