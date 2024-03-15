<template>
  <div class="navbar">
    <nav class="navbar-up">
      <div>
        <p class="p-navbar">PharmaShop-Lideres en confianza</p>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
      </div>
      <div class="navbar-div-up">
        <i class="fa-solid fa-truck-fast" style="color: #ffffff"></i>
        <p>Tus productos en casa en solo 24 - 48 horas</p>
      </div>
      <div>
        <article class="article-up">
          <i class="fa-solid fa-phone" style="color: #ffffff"></i>
          <p>952 944 601</p>
        </article>
        <article class="article-up">
          <i class="fa-brands fa-whatsapp" style="color: #ffffff"></i>
          <p>626 405 143</p>
        </article>
      </div>
    </nav>
    <nav class="navbar-center">
      <article class="article-center1">
        <i class="fa-regular fa-circle-question" style="color: #41aba9"></i>
        <button>Información</button>
      </article>
      <article class="article-center2">
        <dropdown-menu
          :isOpen="isMenuOpen"
          @closeMenu="closeMenu"
        ></dropdown-menu>
        <i class="fa-solid fa-user" style="color: #41aba9"></i>
        <button @click="toggleMenu">{{ username }}</button>
      </article>
    </nav>
    <div class="navbar-down">
      <router-link to="/" class="logo-link">
        <img src="../images/logo-transparent.png" alt="Logo" class="img-logo" />
      </router-link>
      <router-link to="/cart">
        <i class="fa-solid fa-cart-shopping" style="color: #41aba9"></i>
      </router-link>
    </div>
    <div class="div-ul">
      <ul class="ul-category">
        <li
          class="li-category"
          v-for="(category, index) in categories"
          :key="index"
          :class="{ active: isCurrentRoute(category.route) }"
        >
          <router-link :to="category.route" class="category-link">{{
            category.label
          }}</router-link>
        </li>
      </ul>
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
      categories: [
        { label: "DENTAL", route: "/dental" },
        { label: "COSMÉTICA", route: "/cosmetica" },
        { label: "NUTRICIÓN", route: "/nutricion" },
        { label: "BEBÉ Y MAMÁ", route: "/bebeymama" },
        { label: "SALUD", route: "/salud" },
        { label: "HIGIENE", route: "/higiene" },
        { label: "ÓPTICA", route: "/optica" },
        { label: "ORTOPEDIA", route: "/ortopedia" },
        { label: "MASCOTAS", route: "/mascotas" },
        { label: "MEDICAMENTOS", route: "/medicamentos" },
      ],
    };
  },
  mounted() {
    const userObjectFromCookie = Cookies.get("userLogued");
    if (userObjectFromCookie) {
      const userObject = JSON.parse(userObjectFromCookie);
      this.username = userObject.username;
    }
  },

  methods: {
    isCurrentRoute(route) {
      return this.$route.path === route;
    },
    goLogin() {
      this.$router.push("/login");
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
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

.navbar-div-up {
  p {
    margin-left: 10px;
  }
}

.article-up {
  display: flex;
  align-items: center;
  width: 50%;

  p {
    margin-left: 11px;
  }
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
.div-ul {
  width: 1400px;
  margin: auto;
}

.ul-category {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.li-category {
  width: 18%;
  text-align: center;
  margin: 5px;
}

.category-link {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.category-link:hover {
  background-color: #66e0ca;
}
.li-category.active {
  background-color: #41aba9;
  color: white;
  border-radius: 5px;
}

.navbar-down {
  width: 91vw;
  height: 11vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    font-size: 45px;
  }
}

.logo-link {
  width: 15%;
  text-decoration: none;
}

.img-logo {
  width: 88%;
  height: auto;
}

@media (max-width: 1218px) {
  .div-table {
    overflow-x: auto;
  }
}

@media (max-width: 852px) {
  .navbar-up {
    flex-direction: column;
    align-items: center;

    div:last-child {
      width: 100%;
      margin-top: 10px;
    }
  }
  .article-up {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: center;
  }
  .logo-link {
    display: none;
  }

  .navbar-center {
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 10px;
    }
  }

  .navbar-down {
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 80%;
    }

    i {
      margin-top: 10px;
    }
  }

  .div-table {
    width: 100%;
    overflow-x: auto; /* Permitir el desplazamiento horizontal si la tabla es demasiado ancha */
  }

  .table-category {
    width: 100%; /* Establecer un ancho del 100% para que la tabla se ajuste al contenedor */
    border: 2px solid #41aba9;
  }
}
</style>
