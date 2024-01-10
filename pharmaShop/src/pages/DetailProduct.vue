<template>
  <div>
    <div v-if="product" class="product-container">
      <section class="section-product">
        <div class="image-details-container">
          <div class="image-container">
            <img :src="product.image" alt="" />
          </div>
          <div class="details-container">
            <h1>{{ product.name }}</h1>
            <p class="description">{{ product.description }}</p>
            <p>{{ product.price }} €</p>

            <p v-if="product.stock > 10" class="p-stock1">Hay stock</p>
            <p v-if="product.stock <= 10" class="p-stock2">Hay poco stock</p>
            <p v-if="product.stock <= 0" class="p-stock3">No hay stock</p>
            <div class="btn-fav">
              <div class="quantity-container">
                <button @click="decrementQuantity" class="quantity-button-less">
                  -
                </button>
                <span class="quantity-button">{{ quantity }}</span>
                <button @click="incrementQuantity" class="quantity-button-more">
                  +
                </button>
              </div>
              <button @click="addCart(product)" class="btn-addCart">
                <i
                  class="fa-solid fa-cart-shopping"
                  style="color: #ffffff; font-size: 20px"
                ></i>
                AÑADIR AL CARRO
              </button>
            </div>
            <p class="p-resume">{{ product.resume }}</p>
          </div>
        </div>
      </section>
      <h2>TE RECOMENDAMOS</h2>
      <hr class="separator-horizontal" />
      <section class="section2">
        <div
          class="carousel"
          :style="{ transform: `translateX(-${currentProductSlide}px)` }"
        >
          <div
            v-for="(product, index) in products"
            :key="index"
            class="product-item"
          >
            <div class="product-content">
              <img :src="product.image" alt="Product" class="product-image" />
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">{{ product.price }} €</p>
              <button class="btn-cart" @click="addCart(product)">
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i>
                AÑADIR
              </button>
            </div>
          </div>
        </div>
        <button class="nav-button prev" @click="prevProductSlide">
          <i class="fa-solid fa-chevron-left" style="color: #000000"></i>
        </button>
        <button class="nav-button next" @click="nextProductSlide">
          <i class="fa-solid fa-chevron-right" style="color: #000000"></i>
        </button>
      </section>
      <h2>¿POR QUÉ CONFIAR EN NOSOTROS?</h2>
      <hr class="separator-horizontal" />
      <section class="section3">
        <article class="article3">
          <div class="div3">
            <i
              class="fa-solid fa-piggy-bank"
              style="color: #000000; font-size: 30px"
            ></i>
            <p>Envío gratuito por compras superiores a 60€ (península)</p>
          </div>
          <div class="div3">
            <i
              class="fa-solid fa-truck-fast"
              style="color: #000000; font-size: 30px"
            ></i>
            <p>Tu productos en casa en sólo 24 - 48 horas</p>
          </div>
          <div class="div3">
            <i
              class="fa-regular fa-credit-card"
              style="color: #000000; font-size: 30px"
            ></i>
            <p>Pago 100% seguro con tarjetas o Paypal</p>
          </div>
          <div class="div3">
            <i
              class="fa-solid fa-box"
              style="color: #000000; font-size: 30px"
            ></i>
            <p>Devoluciones garantizadas en 14 días naturales</p>
          </div>
        </article>
      </section>
      <h2>OPINIONES</h2>
      <hr class="separator-horizontal" />
      <section class="section4"></section>
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
      quantity: 1,
      products: [],
      currentProductSlide: 0,
      itemWidth: 300,
      cartItems: [],
    };
  },
  mounted() {
    const productId = this.$route.params.id;

    this.fetchProduct(productId);
    this.getProducts();
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
        console.log(this.product);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async getProducts() {
      const userToken = JSON.parse(
        decodeURIComponent(Cookies.get("userToken"))
      );
      try {
        const response = await axios.get("http://localhost:8080/products", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    prevProductSlide() {
      this.currentProductSlide = Math.max(
        0,
        this.currentProductSlide - this.itemWidth
      );
    },
    nextProductSlide() {
      const maxProductSlide = (this.products.length - 1) * this.itemWidth;
      this.currentProductSlide = Math.min(
        maxProductSlide,
        this.currentProductSlide + this.itemWidth
      );
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addCart(product) {
      const userLogued = JSON.parse(
        decodeURIComponent(Cookies.get("userLogued"))
      );

      const userId = userLogued ? userLogued.id : null;

      if (userId) {
        // Verificar si el producto ya está en el carrito antes de agregarlo
        if (!this.cartItems.includes(product.id)) {
          this.cartItems.push(product.id);

          // Llamar al método para actualizar el carrito en la API
          this.updateCartInApi(userId);
        } else {
          console.warn("El producto ya está en el carrito.");
        }
      } else {
        console.error("ID de usuario no encontrada en userLogued");
      }
    },

    async updateCartInApi(userId) {
      const userToken = JSON.parse(
        decodeURIComponent(Cookies.get("userToken"))
      );

      try {
        const userLogued = JSON.parse(
          decodeURIComponent(Cookies.get("userLogued"))
        );
        userLogued.cart = this.cartItems;

        await axios.put(`http://localhost:8080/users/${userId}`, userLogued, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
      } catch (error) {
        console.error("Error al actualizar el carrito en la API:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.section-product {
  width: 84%;
}
.product-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.image-details-container {
  width: 66%;
  display: flex;
  justify-content: space-around;
}

.image-container {
  width: 330px;
  height: 361px;
  margin-top: 20px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-container {
  width: 100%;
  max-width: 400px;
  margin: 0 20px;
}
.btn-cart {
  width: 60%;
  height: 26px;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #66e0ca;
}

.description {
  max-width: 400px;
}
.p-stock1 {
  width: 200%;
  color: green;
}
.p-stock2 {
  width: 200%;
  color: rgb(98, 98, 0);
}
.p-stock3 {
  width: 200%;
  color: red;
}

.p-resume {
  width: 200%;
}

.btn-fav {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  .btn-addCart {
    width: 55%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
.quantity-container {
  margin-top: 20px;
  text-align: center;
}

.quantity-button {
  padding: 5px;
}

.quantity-button-more {
  background-color: #66e0ca;
  color: #fff;
  border: none;
  border-radius: 3px 10px 10px 3px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
}
.quantity-button-less {
  background-color: #66e0ca;
  color: #fff;
  border: none;
  border-radius: 10px 3px 3px 10px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
}

.btn-addCart {
  width: 30%;
  color: #fff;
  background-color: #66e0ca;
  border-radius: 50px;
  border: none;
}

span {
  margin: 0 10px;
  font-size: 18px;
}
.separator-horizontal {
  width: 80vw;
  border-color: #41aba9;
}

.section2 {
  height: 500px;
  position: relative;
  width: 80%;
  margin: 20px auto;
  overflow: hidden;

  .carousel {
    display: flex;
    transition: transform 0.5s ease;
    align-items: stretch;
    .btn-cart {
      width: 60%;
      height: 26px;
      border: none;
      border-radius: 50px;
      color: white;
      background-color: #66e0ca;
    }
  }

  .product-image {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  .product-name {
    font-weight: bold;
    margin-top: 5px;
  }
  .product-price {
    color: #4d4d4d;
    margin-top: 5px;
  }

  .product-item {
    width: 220px;
    box-sizing: border-box;
    padding: 5px;
    margin-right: 10px;
  }
  .product-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 357px;
    width: 220px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #41aba9;
  }
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    background-color: white;
  }
  .prev {
    left: 0;
  }

  .next {
    right: 0;
    z-index: 2;
  }
}

.section3 {
  width: 100vw;
  display: flex;
  justify-content: center;
  .article3 {
    padding: 30px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .div3 {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
