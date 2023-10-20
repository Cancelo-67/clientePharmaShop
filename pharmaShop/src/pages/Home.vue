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
        <div class="filter-option" @click="filterByPrice('all')">Todo</div>
        <div class="filter-option" @click="filterByPrice('10')">
          $10 o menos
        </div>
        <div class="filter-option" @click="filterByPrice('20')">
          da $20 o menos
        </div>
        <div class="filter-option" @click="filterByPrice('50')">
          $50 o menos
        </div>
        <div class="filter-option" @click="filterByPrice('100')">
          $100 o menos
        </div>
        <div class="filter-option" @click="filterByPrice('200')">
          $200 o menos
        </div>
        <!-- Agrega más opciones de precio si es necesario -->
      </div>
    </div>
    <div class="product-container">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product"
      >
        <img :src="product.images" alt="Imagen de producto" />
        <div>{{ product.title }}</div>
        <p>{{ product.price }}€</p>
      </div>
    </div>
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
      showFilters: false, // Agregamos una propiedad para mostrar/ocultar los filtros en dispositivos móviles
    };
  },
  created() {
    getProducts("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        this.response = response;
        this.products = response.data;
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  },
  methods: {
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
  },
  computed: {
    filteredProducts() {
      if (this.selectedPrice === "all" && this.selectedBrand === null) {
        return this.products;
      }

      const maxPrice = parseFloat(this.selectedPrice);
      return this.products.filter((product) => {
        const priceCondition = parseFloat(product.price) <= maxPrice;
        const brandCondition =
          this.selectedBrand === null || product.brand === this.selectedBrand;
        return priceCondition && brandCondition;
      });
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
  flex-direction: column;
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

.filter-toggle {
  display: none; /* Inicialmente ocultamos el botón de filtro en pantallas más grandes */
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
  max-height: 100px;
}
@media screen and (max-width: 1024px) {
}

@media screen and (max-width: 782px) {
  /* Estilos específicos para tamaños de pantalla más pequeños, como tabletas y dispositivos móviles */
  .filter-bar {
    display: none; /* Oculta los filtros en dispositivos móviles */
  }

  .filter-bar.show-filters {
    display: block; /* Muestra el menú desplegable de filtros al hacer clic en el botón de filtro */
    width: 100%; /* Ocupa todo el ancho en pantallas más pequeñas */
    position: absolute;
    background-color: white;
    z-index: 1;
    top: 52px;
  }

  .filter-title,
  .filter-section,
  .filter-option {
    font-size: 16px; /* Ajusta el tamaño del texto para pantallas más pequeñas */
    text-align: left; /* Alinea el texto a la izquierda */
  }

  .filter-toggle {
    display: block; /* Muestra el botón de filtro en dispositivos móviles */
    text-align: center;
    padding: 10px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
