<template>
  <div class="container-all">
    <section class="section1">
      <article class="images">
        <div class="carousel-container">
          <div class="carousel">
            <img :src="currentImage" alt="Slide" class="img-big" />
            <div class="indicators">
              <span
                v-for="(image, index) in images"
                :key="index"
                :class="{ active: index === currentImageIndex }"
                @click="goToImage(index)"
              ></span>
            </div>
          </div>
        </div>
        <div class="home-images">
          <article>
            <img src="../images/imagen2.png" alt="" />
          </article>
          <article>
            <img src="../images/imagen3.png" alt="" />
          </article>
          <article>
            <img src="../images/imagen4.png" alt="" />
          </article>
          <article>
            <img src="../images/imagen5.png" alt="" />
          </article>
        </div>
      </article>
    </section>
    <section class="section2">
      <div class="div-separator">
        <h2>DESTACADOS</h2>
        <hr class="separator-horizontal" />
      </div>

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
            <div class="btn-product">
              <router-link :to="'/products/' + product.id">
                <button class="btn-fav-eye">
                  <i class="fa-solid fa-eye" style="color: #000000"></i>
                </button>
              </router-link>
              <button class="btn-cart" @click="toggleCart(product)">
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i>
                AÑADIR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      productsCart: JSON.parse(localStorage.getItem("productsCart")) || [],
      images: ["/src/images/imagen1.png", "/src/images/imagen1.png"],
      currentImageIndex: 0,
      currentProductSlide: 0,
      products: [],
      currentProductSlide: 0,
      itemWidth: 300,
      quantity: 1,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  mounted() {
    this.startImageInterval();
    this.getProducts();
  },
  methods: {
    startImageInterval() {
      this.intervalId = setInterval(this.nextImage, 5000);
    },
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
    goToImage(index) {
      this.currentImageIndex = index;
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
    async toggleCart(product) {
      const productCart = {
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: this.quantity,
      };

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = this.productsCart.findIndex(
        (item) => item.name === productCart.name
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, quita el producto
        this.productsCart.splice(existingProductIndex, 1);
      } else {
        // Si el producto no está en el carrito, agrégalo
        this.productsCart.push(productCart);
      }

      // Guardar la lista de productos en localStorage
      localStorage.setItem("productsCart", JSON.stringify(this.productsCart));

      console.log(this.productsCart);
    },
  },
};
</script>

<style lang="scss" scoped>
.section1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
.section2 {
  width: 94%;
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }
}

.container-all {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.articles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img-big {
  width: 661px;
}
.images {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;

  .home-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    article {
      box-sizing: border-box;
      padding: 5px;
      img {
        width: 400px;
      }
    }
  }
}

.product-carousel {
  height: 320px;
  position: relative;
  width: 80%;
  margin: 20px auto;
  overflow: hidden;

  .carousel {
    display: flex;
    transition: transform 0.5s ease;
  }

  .product-image {
    width: 200px;
    height: auto;
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
    box-sizing: border-box;
    padding: 5px;
    margin-right: 10px;
  }
  .product-content {
    height: 320px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #41aba9;
  }
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
img {
  width: 100%;
  height: auto;
}
.btn-cart {
  color: white;
  border: none;
  height: 90%;
  width: 56%;
  border-radius: 13px;
  background: #66e0ca;
  cursor: pointer;
}
.btn-fav-eye {
  width: 150%;
  height: 87%;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #66e0ca;
  cursor: pointer;
}
.btn-product {
  width: 84%;
  height: 9%;
  display: flex;
  justify-content: space-around;
}

.div-separator {
  display: flex;
  flex-direction: column;
}

.separator-horizontal {
  width: 90vw;
  border-color: #41aba9;
}
@media (max-width: 1878px) {
  .images img {
    max-width: 100%; /* La imagen no superará el ancho de su contenedor */
    height: auto; /* La altura se ajustará automáticamente para mantener la proporción */
  }
}
</style>
