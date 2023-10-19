<template>
  <div class="page-content">
    <div class="filter-bar">
      <div class="filter-title">Filtros</div>
      <select v-model="selectedFilter" class="filter-select">
        <option value="all">Todos los productos</option>
        <option value="10">$10 o menos</option>
        <option value="20">$20 o menos</option>
        <option value="50">$50 o menos</option>
        <option value="100">$100 o menos</option>
        <option value="200">$200 o menos</option>
      </select>
    </div>
    <div class="search-bar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" class="search-input" placeholder="Buscar productos" />
    </div>
    <div class="product-container">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product"
      >
        <div>{{ product.title }}</div>
        <img :src="product.images" alt="Imagen de producto" />
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
      selectedFilter: "all",
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
  computed: {
    filteredProducts() {
      if (this.selectedFilter === "all") {
        return this.products;
      }
      const maxPrice = parseFloat(this.selectedFilter);
      return this.products.filter(
        (product) => parseFloat(product.price) <= maxPrice
      );
    },
  },
};
</script>

<style scoped>
.page-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.filter-bar {
  display: flex;
  align-items: center;
  padding: 20px; /* Aumenta el espacio interior del recuadro */
  border: 1px solid #ccc; /* Agrega un borde al recuadro de filtros */
  border-radius: 5px;
}

.filter-title {
  font-size: 20px; /* Tamaño del título de filtros */
  margin: 1rem; /* Espacio entre el título y el select */
}

.filter-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-bar {
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product img {
  max-width: 100%;
}
</style>
