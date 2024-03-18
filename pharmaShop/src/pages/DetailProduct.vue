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
              <button @click="toggleCart(product)" class="btn-addCart">
                <i
                  class="fa-solid fa-cart-shopping"
                  style="color: #000000; font-size: 20px"
                ></i>
                AÑADIR AL CARRO
              </button>
              <button class="btn-addFav" @click="toggleFavorite(product)">
                <i
                  :class="{
                    'fa-regular fa-heart': !product.isFavorite,
                    'fa-solid fa-heart': product.isFavorite,
                  }"
                  style="color: #ff0000; font-size: 20px"
                ></i>
              </button>
            </div>
            <p class="p-resume">{{ product.resume }}</p>
          </div>
        </div>
      </section>
      <div class="separator">
        <h2>TE RECOMENDAMOS</h2>
        <hr class="separator-horizontal" />
      </div>

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
              <img :src="product.image" alt="Product" class="" />
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">{{ product.price }} €</p>
              <div class="btn-product">
                <button @click="changeUrl(product)" class="btn-fav-eye">
                  <i class="fa-solid fa-eye" style="color: #000000"></i>
                </button>

                <button class="btn-cart" @click="toggleCart(product)">
                  <i
                    class="fa-solid fa-cart-shopping"
                    style="color: #000000"
                  ></i>
                  AÑADIR
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="separator">
        <h2>¿POR QUÉ CONFIAR EN NOSOTROS?</h2>
        <hr class="separator-horizontal" />
      </div>
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
      <div class="separator">
        <h2>OPINIONES</h2>
        <hr class="separator-horizontal" />
      </div>

      <section class="section4">
        <!-- ------------ Crear comentarios -------------->
        <form @submit.prevent="createComment()" class="comment-form">
          <textarea
            v-model="newComment"
            rows="3"
            placeholder="Añade tu comentario"
            class="comment-input"
          ></textarea>
          <button type="submit" class="btn btn-primary btn-md comment-button">
            Añadir Comentario
          </button>
        </form>
        <ul class="ul-comment">
          <li
            v-for="comment in comments"
            :key="comment.id_user"
            class="li-comment"
          >
            <div class="comment-container">
              <p>{{ comment.name }}</p>
              <span v-if="comment.id_user">
                {{ comment.comment }}
              </span>
              <div>
                <button
                  @click="eliminateComment(comment)"
                  v-if="comment.eliminate"
                  class="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
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
      productId: this.$route.params.id,
      userLogued: JSON.parse(decodeURIComponent(Cookies.get("userLogued"))),
      userToken: JSON.parse(decodeURIComponent(Cookies.get("userToken"))),
      product: {},
      quantity: 1,
      products: [],
      currentProductSlide: 0,
      itemWidth: 300,
      productsCart: JSON.parse(localStorage.getItem("productsCart")) || [],
      favItems: JSON.parse(localStorage.getItem("favItems")) || [],
      newComment: "",
      comments: [],
    };
  },
  mounted() {
    this.fetchProduct(this.productId);
    this.getProducts();
    this.getComments();
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${this.userToken}`,
            },
          }
        );

        const product = response.data[0];
        product.isFavorite = this.favItems.includes(product.id);
        this.product = product;
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:8080/products", {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
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
    changeUrl(productSelected) {
      this.product = productSelected;
      const router = this.$router;
      router.push("/products/" + productSelected.id);
    },
    async toggleCart(product) {
      const productCart = {
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: this.quantity,
      };
      const cartKey = `productsCart_${this.userLogued.id}`;
      const productsCart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const existingProductIndex = productsCart.findIndex(
        (item) => item.name === productCart.name
      );

      if (existingProductIndex !== -1) {
        productsCart.splice(existingProductIndex, 1);
      } else {
        // Si el producto no está en el carrito, agrégalo
        productsCart.push(productCart);
      }

      // Guardar la lista de productos en localStorage
      localStorage.setItem(cartKey, JSON.stringify(productsCart));
    },

    async toggleFavorite(product) {
      if (!this.favItems.includes(product.id)) {
        this.favItems.push(product.id);
        product.isFavorite = true;
      } else {
        const index = this.favItems.indexOf(product.id);
        this.favItems.splice(index, 1);
        product.isFavorite = false;
      }

      // Guardar la lista de favoritos en localStorage
      localStorage.setItem("favItems", JSON.stringify(this.favItems));

      // Llamar al método para actualizar el carrito en la API
      this.updateFavInApi(this.userLogued.id);
    },
    async updateFavInApi(userId) {
      try {
        this.userLogued.favorites = this.favItems;

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
    async getComments() {
      const userLogued = JSON.parse(
        decodeURIComponent(Cookies.get("userLogued"))
      );
      const userToken = JSON.parse(
        decodeURIComponent(Cookies.get("userToken"))
      );
      this.comments = [];
      const response = await axios.get("http://localhost:8080/comments", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log();
      response.data.forEach((comment) => {
        this.productId = parseInt(this.productId);
        if (comment.id_product === this.productId)
          if (parseInt(comment.id_product) === parseInt(this.productId)) {
            this.comments.push(comment);

            if (comment.id_user === userLogued.username) {
              comment.eliminate = true;
            }
          }
      });
    },
    async createComment() {
      const goodComment = this.newComment.trim();
      const config = {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      };

      if (goodComment === "") {
        console.log("Comentario vacío");
        console.log(this.userLogued);
      } else {
        const createNewComment = {
          id_user: this.userLogued.username,
          id_product: this.productId,
          name: this.userLogued.username,
          comment: goodComment,
        };

        await axios
          .post("http://localhost:8080/comments", createNewComment, config)
          .then(() => {
            this.getComments();
            this.newComment = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async eliminateComment(comment) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      };
      try {
        await axios.delete(
          `http://localhost:8080/comments/${comment.id}`,
          config
        );
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
}
h2 {
  margin-top: 50px;
  margin-bottom: 20px;
}

.section-product {
  width: 80vw;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 100%;
  margin: 0;
}

.article3 {
  display: flex;
  justify-content: space-around;
  width: 90%;
}

.product-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.image-details-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
}

.image-container {
  width: 100%;
  max-width: 400px;
  height: auto;
  img {
    border-radius: 20px;
  }
}

img {
  width: 100%;
  height: auto;
}

.details-container {
  flex: 1;
  max-width: 600px;
  margin: 20px;
}

.btn-addFav {
  background: transparent;
  border: none;
}

.section2 {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  width: 100%;
}

.carousel {
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  box-sizing: border-box;
}

.product-item {
  flex: 0 0 auto;
  width: 220px;
  margin-right: 10px;
}

.product-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 357px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #41aba9;
}
.btn-product {
  display: flex;
  width: 70%;
  height: 9%;
  display: flex;
  justify-content: space-around;
  a {
    width: 50%;
  }
}
.btn-fav-eye {
  width: 22%;
  height: 87%;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #66e0ca;
  cursor: pointer;
}
.btn-cart {
  color: black;
  border: none;
  height: 100%;
  width: 57%;
  border-radius: 13px;
  background: #66e0ca;
  cursor: pointer;
}

.section3 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.div3 {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section4 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.comment-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 10px;
  width: 20%;
  padding: 8px;
}

.comment-button {
  width: 10%;
  margin-top: 10px;
  padding: 12px;
  background-color: #66e0ca;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.ul-comment {
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.33% - 20px), 1fr));
  gap: 20px;
}

.li-comment {
  width: 100%;
}

@media screen and (max-width: 767px) {
  .ul-comment {
    grid-template-columns: 1fr;
  }
}

.comment-container {
  display: flex;
  width: 72%;
  color: black;
  background-color: #41aba9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: center;
}

.comment-container textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.comment-container button {
  padding: 8px 15px;
  margin-right: 10px;
  background-color: red;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-container button + button {
  background-color: #f44336;
}

.comment-container button + button:hover {
  background-color: #d32f2f;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 63%;
  max-width: 600px;
  .btn-addCart {
    width: 50%;
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
  color: #000000;
  border: none;
  border-radius: 3px 10px 10px 3px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
}
.quantity-button-less {
  background-color: #66e0ca;
  color: #000000;
  border: none;
  border-radius: 10px 3px 3px 10px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
}

.btn-addCart {
  width: 30%;
  color: #000000;
  background-color: #66e0ca;
  border-radius: 50px;
  border: none;
  cursor: pointer;
}

span {
  margin: 0 10px;
  font-size: 18px;
}
.separator {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}
.separator-horizontal {
  width: 90vw;
  border-color: #41aba9;
}
</style>
