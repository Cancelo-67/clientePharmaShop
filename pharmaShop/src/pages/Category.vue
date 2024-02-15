<template>
  <div class="first-search">
    <div class="search-bar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        class="search-input"
        placeholder="Buscar"
        v-model="searchQuery"
        @input="handleSearch"
      />
    </div>
  </div>
  <div class="page-content">
    <!-- Botón de filtro para dispositivos móviles -->
    <button class="filter-toggle" @click="toggleFilters">
      <i class="fa-solid fa-filter"></i> Filtrar
    </button>
    <div class="filter-bar" :class="{ 'show-filters': showFilters }">
      <div class="filter-close" @click="closeFilters">
        <button class="close-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="filter-title">Filtros</div>
      <div class="filter-section">
        <input
          type="number"
          v-model="minPrice"
          placeholder="Mínimo €"
          class="price-input"
        />
        <span class="price-separator">-</span>
        <input
          type="number"
          v-model="maxPrice"
          placeholder="Máximo €"
          class="price-input"
        />
        <button @click="applyPriceRangeFilter" class="filter-option">
          Aplicar
        </button>
      </div>
    </div>
    <div class="product-container">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product"
      >
        <img :src="product.image" alt="Imagen de producto" />
        <div>{{ product.name }}</div>
        <p>{{ product.price }} €</p>
        <div class="btn-product">
          <router-link :to="'/products/' + product.id">
            <button class="btn-fav-eye">
              <i class="fa-solid fa-eye" style="color: #000000"></i>
            </button>
          </router-link>
          <button class="btn-cart" @click="toggleCart(product)">
            <i
              class="fa-solid fa-cart-shopping"
              style="color: #ffffff; font-size: 15px"
            ></i>
            AÑADIR
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="pagination">
    <button
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
    >
      <svg
        width="9"
        height="11"
        viewBox="0 0 9 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.79406 10.8L0.214063 6.2V5.5L8.79406 0.88V2.22L2.07406 5.86L8.79406 9.46V10.8Z"
          fill="#41ABA9"
          fill-opacity="0.8"
        />
        <path
          d="M8.79406 10.8L8.20343 11.9017L10.0441 12.8885V10.8H8.79406ZM0.214063 6.2H-1.03594V6.94815L-0.37657 7.30166L0.214063 6.2ZM0.214063 5.5L-0.378562 4.39941L-1.03594 4.75338V5.5H0.214063ZM8.79406 0.88H10.0441V-1.21277L8.20144 -0.220589L8.79406 0.88ZM8.79406 2.22L9.38942 3.31911L10.0441 2.96451V2.22H8.79406ZM2.07406 5.86L1.47871 4.76088L-0.561651 5.86608L1.48379 6.96185L2.07406 5.86ZM8.79406 9.46H10.0441V8.71157L9.38434 8.35815L8.79406 9.46ZM9.3847 9.69834L0.804696 5.09834L-0.37657 7.30166L8.20343 11.9017L9.3847 9.69834ZM1.46406 6.2V5.5H-1.03594V6.2H1.46406ZM0.806687 6.60059L9.38669 1.98059L8.20144 -0.220589L-0.378562 4.39941L0.806687 6.60059ZM7.54406 0.88V2.22H10.0441V0.88H7.54406ZM8.19871 1.12088L1.47871 4.76088L2.66942 6.95911L9.38942 3.31911L8.19871 1.12088ZM1.48379 6.96185L8.20379 10.5618L9.38434 8.35815L2.66434 4.75815L1.48379 6.96185ZM7.54406 9.46V10.8H10.0441V9.46H7.54406Z"
          fill="white"
        />
        <path
          d="M8.79406 10.8L8.20343 11.9017L10.0441 12.8885V10.8H8.79406ZM0.214063 6.2H-1.03594V6.94815L-0.37657 7.30166L0.214063 6.2ZM0.214063 5.5L-0.378562 4.39941L-1.03594 4.75338V5.5H0.214063ZM8.79406 0.88H10.0441V-1.21277L8.20144 -0.220589L8.79406 0.88ZM8.79406 2.22L9.38942 3.31911L10.0441 2.96451V2.22H8.79406ZM2.07406 5.86L1.47871 4.76088L-0.561651 5.86608L1.48379 6.96185L2.07406 5.86ZM8.79406 9.46H10.0441V8.71157L9.38434 8.35815L8.79406 9.46ZM9.3847 9.69834L0.804696 5.09834L-0.37657 7.30166L8.20343 11.9017L9.3847 9.69834ZM1.46406 6.2V5.5H-1.03594V6.2H1.46406ZM0.806687 6.60059L9.38669 1.98059L8.20144 -0.220589L-0.378562 4.39941L0.806687 6.60059ZM7.54406 0.88V2.22H10.0441V0.88H7.54406ZM8.19871 1.12088L1.47871 4.76088L2.66942 6.95911L9.38942 3.31911L8.19871 1.12088ZM1.48379 6.96185L8.20379 10.5618L9.38434 8.35815L2.66434 4.75815L1.48379 6.96185ZM7.54406 9.46V10.8H10.0441V9.46H7.54406Z"
          fill="white"
        />
        <path
          d="M8.79406 10.8L8.20343 11.9017L10.0441 12.8885V10.8H8.79406ZM0.214063 6.2H-1.03594V6.94815L-0.37657 7.30166L0.214063 6.2ZM0.214063 5.5L-0.378562 4.39941L-1.03594 4.75338V5.5H0.214063ZM8.79406 0.88H10.0441V-1.21277L8.20144 -0.220589L8.79406 0.88ZM8.79406 2.22L9.38942 3.31911L10.0441 2.96451V2.22H8.79406ZM2.07406 5.86L1.47871 4.76088L-0.561651 5.86608L1.48379 6.96185L2.07406 5.86ZM8.79406 9.46H10.0441V8.71157L9.38434 8.35815L8.79406 9.46ZM9.3847 9.69834L0.804696 5.09834L-0.37657 7.30166L8.20343 11.9017L9.3847 9.69834ZM1.46406 6.2V5.5H-1.03594V6.2H1.46406ZM0.806687 6.60059L9.38669 1.98059L8.20144 -0.220589L-0.378562 4.39941L0.806687 6.60059ZM7.54406 0.88V2.22H10.0441V0.88H7.54406ZM8.19871 1.12088L1.47871 4.76088L2.66942 6.95911L9.38942 3.31911L8.19871 1.12088ZM1.48379 6.96185L8.20379 10.5618L9.38434 8.35815L2.66434 4.75815L1.48379 6.96185ZM7.54406 9.46V10.8H10.0441V9.46H7.54406Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setCurrentPage(page)"
      :class="{ active: page === currentPage }"
      class="pagination-button"
    >
      {{ page }}
    </button>
    <button
      @click="setCurrentPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button"
    >
      <svg
        width="9"
        height="11"
        viewBox="0 0 9 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.213818 10.8V9.46L6.93382 5.86L0.213818 2.22V0.88L8.79382 5.5V6.2L0.213818 10.8Z"
          fill="#41ABA9"
          fill-opacity="0.8"
        />
        <path
          d="M0.213819 10.8H-1.03618V12.8885L0.804451 11.9017L0.213819 10.8ZM0.213819 9.46L-0.376458 8.35815L-1.03618 8.71157V9.46H0.213819ZM6.93382 5.86L7.5241 6.96185L9.56953 5.86608L7.52917 4.76088L6.93382 5.86ZM0.213819 2.22H-1.03618V2.96451L-0.381536 3.31911L0.213819 2.22ZM0.213819 0.88L0.806443 -0.220589L-1.03618 -1.21277V0.88H0.213819ZM8.79382 5.5H10.0438V4.75338L9.38644 4.39941L8.79382 5.5ZM8.79382 6.2L9.38445 7.30166L10.0438 6.94815V6.2H8.79382ZM1.46382 10.8V9.46H-1.03618V10.8H1.46382ZM0.804095 10.5618L7.5241 6.96185L6.34354 4.75815L-0.376458 8.35815L0.804095 10.5618ZM7.52917 4.76088L0.809173 1.12088L-0.381536 3.31911L6.33846 6.95911L7.52917 4.76088ZM1.46382 2.22V0.88H-1.03618V2.22H1.46382ZM-0.378806 1.98059L8.20119 6.60059L9.38644 4.39941L0.806443 -0.220589L-0.378806 1.98059ZM7.54382 5.5V6.2H10.0438V5.5H7.54382ZM8.20319 5.09834L-0.376814 9.69834L0.804451 11.9017L9.38445 7.30166L8.20319 5.09834Z"
          fill="white"
        />
        <path
          d="M0.213819 10.8H-1.03618V12.8885L0.804451 11.9017L0.213819 10.8ZM0.213819 9.46L-0.376458 8.35815L-1.03618 8.71157V9.46H0.213819ZM6.93382 5.86L7.5241 6.96185L9.56953 5.86608L7.52917 4.76088L6.93382 5.86ZM0.213819 2.22H-1.03618V2.96451L-0.381536 3.31911L0.213819 2.22ZM0.213819 0.88L0.806443 -0.220589L-1.03618 -1.21277V0.88H0.213819ZM8.79382 5.5H10.0438V4.75338L9.38644 4.39941L8.79382 5.5ZM8.79382 6.2L9.38445 7.30166L10.0438 6.94815V6.2H8.79382ZM1.46382 10.8V9.46H-1.03618V10.8H1.46382ZM0.804095 10.5618L7.5241 6.96185L6.34354 4.75815L-0.376458 8.35815L0.804095 10.5618ZM7.52917 4.76088L0.809173 1.12088L-0.381536 3.31911L6.33846 6.95911L7.52917 4.76088ZM1.46382 2.22V0.88H-1.03618V2.22H1.46382ZM-0.378806 1.98059L8.20119 6.60059L9.38644 4.39941L0.806443 -0.220589L-0.378806 1.98059ZM7.54382 5.5V6.2H10.0438V5.5H7.54382ZM8.20319 5.09834L-0.376814 9.69834L0.804451 11.9017L9.38445 7.30166L8.20319 5.09834Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      userLogued: JSON.parse(decodeURIComponent(Cookies.get("userLogued"))),
      userToken: JSON.parse(decodeURIComponent(Cookies.get("userToken"))),
      productsCart: JSON.parse(localStorage.getItem("productsCart")) || [],
      response: null,
      products: [],
      selectedPrice: "all",
      selectedBrand: null,
      showFilters: false,
      itemsPerPage: 20,
      currentPage: 1,
      minPrice: "",
      maxPrice: "",
      searchQuery: "",
      favItems: [],
      quantity: 1,
    };
  },

  mounted() {
    this.fetchProducts();
  },
  watch: {
    // Observa cambios en la ruta
    $route: "fetchProductsOnRouteChange",
  },

  methods: {
    async fetchProductsOnRouteChange() {
      // Verifica si hay un cambio en la categoría antes de realizar la llamada
      if (this.$route.params.category !== this.prevCategory) {
        this.prevCategory = this.$route.params.category;
        await this.fetchProducts();
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/byCategory/${this.$route.params.category}`,
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`,
            },
          }
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },

    toggleFilters() {
      this.showFilters = !this.showFilters;
    },

    closeFilters() {
      this.showFilters = false;
    },

    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    applyPriceRangeFilter() {
      if (this.minPrice === "" && this.maxPrice === "") {
        this.selectedPrice = "all";
      } else {
        const min = parseFloat(this.minPrice) || 0;
        const max = parseFloat(this.maxPrice) || Infinity;
        this.selectedPrice = `${min}-${max}`;
      }
    },

    handleSearch() {
      this.currentPage = 1;
    },

    async toggleCart(product) {
      const productCart = {
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: this.quantity,
      };

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = this.productsCart.findIndex(
        (item) => item.name === productCart.name
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, quita el producto
        this.productsCart.splice(existingProductIndex, 1);
      } else {
        // Si el producto no está en el carrito, agrégalo
        this.productsCart.push(productCart);
      }

      // Guardar la lista de productos en localStorage
      localStorage.setItem("productsCart", JSON.stringify(this.productsCart));

      console.log(this.productsCart);
    },

    async updateFavInApi(userId) {
      try {
        userLogued.favorites = this.favItems;

        await axios.put(
          `http://localhost:8080/users/${userId}`,
          this.userLogued,
          {
            headers: { Authorization: `Bearer ${this.userToken}` },
          }
        );
      } catch (error) {
        console.error("Error al actualizar el carrito en la API:", error);
      }
    },
  },

  computed: {
    filteredProducts() {
      if (
        this.selectedPrice === "all" &&
        this.selectedBrand === null &&
        !this.searchQuery
      ) {
        return this.products;
      }

      const priceRange = this.selectedPrice.split("-");
      const minPrice = parseFloat(priceRange[0]) || 0;
      const maxPrice = parseFloat(priceRange[1]) || Infinity;

      return this.products.filter((product) => {
        const priceCondition =
          parseFloat(product.price) >= minPrice &&
          parseFloat(product.price) <= maxPrice;

        const brandCondition =
          this.selectedBrand === null ||
          (product.brand && product.brand === this.selectedBrand);

        const matchesSearch =
          (product.name &&
            product.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (product.brand &&
            product.brand
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()));

        return priceCondition && brandCondition && matchesSearch;
      });
    },

    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.first-search {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.page-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.filter-bar {
  color: #ffffff;
  background-color: #41aba9;
  width: 24%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 2rem;
}

.filter-title {
  font-size: 20px;
  margin: 1rem;
}

.filter-section {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.filter-option {
  padding: 10px;
  background-color: #66e0ca;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.pagination {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}
.pagination-button {
  padding: 13px;
  background-color: #41aba9;
  color: white;
  border: 1px solid black;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  margin: 5px;
}

.btn-product {
  width: 84%;
  height: 9%;
  display: flex;
  justify-content: space-around;
}

.btn-cart {
  width: 60%;
  height: 26px;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #66e0ca;
  cursor: pointer;
}
.btn-fav-eye {
  width: 150%;
  height: 87%;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #66e0ca;
  cursor: pointer;
}

.pagination-button[disabled] {
  background-color: #41aba9;
  cursor: not-allowed;
}
.pagination-button.active {
  background-color: #66e0ca;
  color: black;
}
.filter-toggle {
  display: none;
}

.close-button {
  display: none;
}

.fa-filter {
  margin-right: 5px;
}

.search-bar {
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product-container {
  width: 47vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 1rem;
  gap: 10px;
}

.product {
  display: flex;
  width: 104%;
  height: 20rem;
  border-radius: 5px;
  padding: 6px;
  text-align: center;
  background-color: #41aba9;
  color: #333333;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.product img {
  margin: 10px;
  max-width: 100%;
  max-height: 180px;
}

/* Estilos para el filtrado */
.price-input {
  width: 5rem;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  margin: 2px;
}

.price-separator {
  font-size: 20px;
  margin: 0 5px;
}
@media screen and (max-width: 1192px) {
  .filter-section {
    flex-direction: column;
  }
}

@media screen and (max-width: 782px) {
  .page-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .filter-bar {
    display: none;
  }

  .filter-bar.show-filters {
    display: block;
    width: 90%;
    position: absolute;
    background-color: white;
    z-index: 1;
    top: 52px;
  }

  .filter-title,
  .filter-section,
  .filter-option {
    font-size: 16px;
    text-align: left;
  }

  .filter-toggle {
    display: block;
    text-align: center;
    padding: 10px;
    background-color: #41aba9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .pagination {
    display: flex;
  }
  .close-button {
    width: 0%;
    display: flex;
  }

  .pagination-button:not(:first-child):not(:last-child) {
    display: none; /* Oculta los botones de paginación en la vista móvil */
  }
}
</style>
