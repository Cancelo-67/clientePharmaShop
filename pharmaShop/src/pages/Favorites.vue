<template>
  <div class="favorites-container">
    <h1>Tus Favoritos</h1>
    <div v-if="favItems.length === 0" class="empty-favorites">
      No tienes ningún producto en tus favoritos.
    </div>
    <div v-else class="product-list">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-info"
      >
        <img :src="product[0].image" alt="" />
        <p class="product-name">{{ product[0].name }}</p>
        <button @click="toggleFavorite(index)" class="favorite-button">
          <i
            :class="[
              'fas',
              {
                'fa-solid fa-heart': product.favorite,
                'fa-regular fa-heart': !product.favorite,
              },
            ]"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      favItems: JSON.parse(localStorage.getItem("favItems")) || [],
      userLogued: JSON.parse(decodeURIComponent(Cookies.get("userLogued"))),
      userToken: JSON.parse(decodeURIComponent(Cookies.get("userToken"))),
      products: [],
    };
  },
  methods: {
    async getUser() {
      axios.get(`http://localhost:8080/users/${this.userLogued.id}`, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      });
    },
    async fetchProductDetails() {
      const productRequests = this.favItems.map((productId) =>
        axios.get(`http://localhost:8080/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
          },
        })
      );
      console.log(productRequests);
      try {
        const responses = await Promise.all(productRequests);
        this.products = responses.map((response) => ({
          ...response.data,
          favorite: true,
        }));
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    toggleFavorite(index) {
      const product = this.products[index];
      product.favorite = !product.favorite; // Cambiar el estado del favorito

      if (!product.favorite) {
        // Si se está eliminando de favoritos, establecer un temporizador para eliminarlo después de 10 segundos
        setTimeout(() => {
          const currentIndex = this.products.findIndex(
            (p) => p.id === product.id
          );
          if (currentIndex !== -1 && !this.products[currentIndex].favorite) {
            this.products.splice(currentIndex, 1);
          }
        }, 5000); // 10000 milisegundos = 10 segundos
      }

      localStorage.setItem("favItems", JSON.stringify(this.favItems));
    },
  },
  mounted() {
    this.getUser();
    this.fetchProductDetails();
  },
};
</script>

<style lang="scss" scoped>
.favorites-container {
  max-width: 1000px;
  margin: 0 auto;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  padding: 10px;
  width: 31%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  img {
    width: 40%;
  }
}

.product-name {
  color: black;
  margin: 0;
  font-weight: bold;
}

.favorite-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ff6b6b;
}
</style>
