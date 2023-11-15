<template>
  <div class="first-search">
    <div class="search-bar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" class="search-input" placeholder="Buscar" />
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
        <p>{{ product.price }}€</p>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button
      @click="setCurrentPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
    >
      Página anterior
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
      Siguiente página
    </button>
  </div>
</template>

<script>
import getProducts from "../helper/api";

export default {
  data() {
    return {
      response: null,
      products: [],
      selectedPrice: "all",
      selectedBrand: null,
      showFilters: false,
      itemsPerPage: 18,
      currentPage: 1,
      minPrice: "",
      maxPrice: "",
    };
  },
  created() {
    getProducts("http://localhost:8080/products")
      .then((response) => {
        this.response = response;
        this.products = response.data;
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  },
  methods: {
    async fetchToken() {
      try {
        const response = await axios.post("http://localhost:8080/token", {
          // Aquí envía tus credenciales o información necesaria para obtener el token
        });

        this.token = response.data.token; // Asigna el token a una propiedad en tu componente
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    },
    filterByPrice(price) {
      this.selectedPrice = price;
    },
    filterByBrand(brand) {
      this.selectedBrand = brand;
      if (brand === null) {
        this.selectedBrand = null;
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
  },
  computed: {
    filteredProducts() {
      if (this.selectedPrice === "all" && this.selectedBrand === null) {
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
          this.selectedBrand === null || product.brand === this.selectedBrand;
        return priceCondition && brandCondition;
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

<style scoped>
.first-search {
  display: flex;
  justify-content: center;
}

.page-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.filter-bar {
  color: #ffffff;
  background-color: #003366;
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
  background-color: #0060c0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
}
.pagination-button {
  padding: 10px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin: 5px;
}

.pagination-button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
.pagination-button.active {
  background-color: #0060c0;
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
  width: 70vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1rem;
  gap: 9px;
}

.product {
  height: 15rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 6px;
  text-align: center;
  background-color: #003366;
  color: white;
}

.product img {
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
    background-color: #003366;
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
