<template>
  <div class="favorites-container">
    <h1 class="page-title">Tus Favoritos</h1>
    <div v-if="favItems.length === 0" class="empty-favorites">
      No tienes ningún producto en tus favoritos.
    </div>
    <div v-else class="product-list">
      <div
        v-for="(product, index) in listfav"
        :key="index"
        class="product-item"
      >
        <div class="product-info">
          <img :src="product[0].image" alt="" class="product-image" />
          <p class="product-name">{{ product[0].name }}</p>
          <button
            @click="toggleFavorite(product[0].id, index)"
            class="favorite-button"
          >
            <i
              :class="[
                'fas',
                {
                  'fa-heart': product.favorite,
                  'fa-heart-o': !product.favorite,
                },
              ]"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
//import Vue from "vue";

export default {
  data() {
    return {
      favItems: JSON.parse(localStorage.getItem("favItems")) || [],
      userLogued: JSON.parse(decodeURIComponent(Cookies.get("userLogued"))),
      userToken: JSON.parse(decodeURIComponent(Cookies.get("userToken"))),
      products: [],
      listfav: [],
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
      try {
        const responses = await Promise.all(productRequests);
        this.products = responses.map((response) => ({
          ...response.data,
          favorite: true,
        }));
        this.listfav = this.products;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    toggleFavorite(productId, indexProduct) {
      console.log(`Id del producto`, productId);
      const productIndex = this.favItems.findIndex(
        (product) => product.id === productId
      );
      console.log(`Product index`, productIndex);

      if (productIndex == -1) {
        this.favItems.splice(indexProduct, 1);
      }

      const productIndex2 = this.listfav.findIndex(
        (product) => product.id === productId
      );

      if (productIndex2 == -1) {
        this.listfav.splice(indexProduct, 1);
      }

      localStorage.setItem("favItems", JSON.stringify(this.favItems));
      console.log(`Favoritos set`, this.favItems);
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
  padding: 20px;
}

.page-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-favorites {
  color: #555;
  font-size: 18px;
  text-align: center;
}

.product-list {
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
}

.product-item {
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-info {
  padding: 10px;
  background-color: #fff;
  transition: transform 0.3s ease;
}

.product-item:hover .product-info {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-name {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.favorite-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  color: #ff6b6b;
}

.favorite-button:hover {
  color: #ff4d4d;
}

/* Estilos para hacer la página responsive */

@media screen and (max-width: 1024px) {
  .product-item {
    width: calc(50% - 20px);
  }
}

@media screen and (max-width: 600px) {
  .product-item {
    width: 100%;
  }
}
</style>
