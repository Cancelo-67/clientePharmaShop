<template>
  <div>
    <div v-if="product" class="product-container">
      <div class="image-container">
        <img :src="product.image" alt="" />
      </div>
      <div class="details-container">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cargando producto...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const productId = this.$route.params.id;

    this.fetchProduct(productId);
  },
  methods: {
    async fetchProduct(productId) {
      const userToken = JSON.parse(
        decodeURIComponent(Cookies.get("userToken"))
      );
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        this.product = response.data[0];
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  width: 76vw;
  display: flex;
  justify-content: center;
}

.image-container {
  width: 330px;
  height: 361px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-container {
  margin-left: 20px;
}
</style>
