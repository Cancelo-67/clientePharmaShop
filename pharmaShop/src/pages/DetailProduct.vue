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
              <button class="btn-addCart">
                <i
                  class="fa-solid fa-cart-shopping"
                  style="color: #ffffff; font-size: 20px"
                ></i>
                AÑADIR AL CARRO
              </button>
              <button class="btn-addFav" @click="toggleFavorite(product)">
                <i
                  :class="{
                    'fa-regular fa-heart': !product.isFavorite,
                    'fa-solid fa-heart': product.isFavorite,
                  }"
                  style="color: #000000; font-size: 20px"
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
              <img :src="product.image" alt="Product" class="product-image" />
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">{{ product.price }} €</p>
              <button class="btn-cart" @click="">
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i>
                AÑADIR
              </button>
            </div>
          </div>
        </div>
        <button class="nav-button-prev" @click="prevProductSlide">
          <i class="fa-solid fa-chevron-left" style="color: #000000"></i>
        </button>
        <button class="nav-button-next" @click="nextProductSlide">
          <i class="fa-solid fa-chevron-right" style="color: #000000"></i>
        </button>
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
              <span v-if="comment.id_user !== editCommentId">
                {{ comment.comment }}
              </span>
              <span v-else>
                <textarea v-model="editedComment" rows="2" cols="30"></textarea>
                <div>
                  <button
                    @click="saveComment(comment.id)"
                    class="btn btn-primary btn-sm"
                  >
                    Guardar cambios
                  </button>
                  <button @click="cancelEdit" class="btn btn-secondary btn-sm">
                    Cancelar
                  </button>
                </div>
              </span>
              <div v-if="!editCommentId">
                <button
                  @click="editComment(comment)"
                  v-if="comment.eliminate"
                  class="btn btn-warning btn-sm"
                >
                  Editar
                </button>
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
      favItems: JSON.parse(localStorage.getItem("favItems")) || [],
      newComment: "",
      comments: [],
      editCommentId: null,
      editedComment: {},
    };
  },
  mounted() {
    this.fetchProduct(this.productId);
    this.getProducts();
    this.getComments();

    const storedFavItems = localStorage.getItem("favItems");
    this.favItems = storedFavItems ? JSON.parse(storedFavItems) : [];

    // Verificar si el producto actual está en la lista de favoritos
    if (this.product) {
      this.product.isFavorite = this.favItems.includes(this.product.id);
    }
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
        product.isFavorite = this.favItems.includes(productId);
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
    async toggleFavorite(product) {
      console.log(this.userLogued.id);

      if (!this.favItems.includes(product.id)) {
        this.favItems.push(product.id);
        console.log("hecho");
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

      console.log(this.favItems);
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
      response.data.forEach((comment) => {
        this.productId = parseInt(this.productId);
        if (comment.id_product === this.productId)
          if (parseInt(comment.id_product) === parseInt(this.productId)) {
            this.comments.push(comment);

            if (comment.id_user === userLogued.id) {
              comment.eliminate = true;
            }
          }
      });
    },
    async createComment() {
      const goodComment = this.newComment.trim();
      const config = {
        headers: {
          Authorization: `Bearer ${this.userToken}`, // Añade el token en la cabecera
        },
      };

      if (goodComment === "") {
        console.log("Comentario vacío");
      } else {
        const createNewComment = {
          id_user: this.userLogued.id,
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
          Authorization: `Bearer ${this.userToken}`, // Añade el token en la cabecera
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
    editComment(comment) {
      if (!this.editedComments[comment.id]) {
        this.editedComments = {
          ...this.editedComments,
          [comment.id]: comment.id,
        };
        this.editedComment = comment.comment;
      }
    },
    saveComment(commentId) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.userToken}`, // Añade el token en la cabecera
        },
      };
      const comment = this.comments.find((comment) => comment.id === commentId);
      comment.comment = this.editedComment;
      this.editedComments[comment.id] = false;
      axios.put(
        `http://localhost:8080/comments/${comment.id}`,
        config,
        comment
      );
    },
    cancelEdit(comment) {
      this.editedComments[comment.id] = false;
      this.editedComment = "";
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
  max-width: 1200px; /* Ajusta el valor según sea necesario */
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
.btn-cart {
  color: white;
  border: none;
  height: 9%;
  width: 57%;
  border-radius: 13px;
  background: #66e0ca;
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

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #000;
}

.nav-button-prev,
.nav-button-next {
  position: absolute;
  bottom: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #000;
}

.nav-button-prev {
  left: 0;
}

.nav-button-next {
  right: 0;
  z-index: 2;
}

.nav-button-prev {
  left: 0;
}

.nav-button-next {
  right: 0;
  z-index: 2;
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
  padding: 8px; /* Agregamos un poco de relleno al área de texto */
}

.comment-button {
  width: 10%;
  margin-top: 10px; /* Añadimos un margen superior para separar el botón del área de texto */
  padding: 12px; /* Ajustamos el relleno del botón para hacerlo más grande */
  background-color: #41aba9;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.ul-comment {
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(33.33% - 20px), 1fr)
  ); // Ajusta según sea necesario
  gap: 20px; // Añade espacio entre los elementos
}

.li-comment {
  width: 100%; // O ajusta según sea necesario
}

@media screen and (max-width: 767px) {
  .ul-comment {
    grid-template-columns: 1fr; // En una pantalla pequeña, solo una columna
  }
}

.comment-container {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-container button:hover {
  background-color: #45a049;
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
