<template>
  <div v-for="product in products" :key="product.id">
    <div>{{ product.title }}</div>
    <img :src="product.images" alt="Imagen de producto" />
  </div>
</template>

<script>
import getProducts from "../helper/api";
export default {
  data() {
    return {
      response: null,
      products: [],
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
    º;
  },
};
</script>

<style scoped></style>
