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
      <h2>DESTACADOS</h2>
      <hr class="separator-horizontal" />

      <!-- Carrusel de productos -->
      <div class="product-carousel">
        <button class="nav-button prev" @click="prevProductSlide">
          <i class="fa-solid fa-chevron-left" style="color: #000000"></i>
        </button>
        <div
          class="carousel"
          :style="{ transform: `translateX(-${currentProductSlide}px)` }"
        >
          <!-- Renderiza todos los productos -->
          <div
            v-for="(product, index) in products"
            :key="index"
            class="product-item"
          >
            <!-- Mostrar detalles del producto según tus necesidades -->
            <p class="product-name">{{ product.name }}</p>
            <img :src="product.image" alt="Product" class="product-image" />
          </div>
        </div>
        <button class="nav-button next" @click="nextProductSlide">
          <i class="fa-solid fa-chevron-right" style="color: #000000"></i>
        </button>
      </div>
    </section>
    <!-- ... (Resto de las secciones) ... -->
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      images: ["/src/images/imagen1.png", "/src/images/imagen1.png"],
      currentImageIndex: 0,
      products: [],
      currentProductSlide: 0,
      itemWidth: 160,
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
  width: 57%;
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
.img-big {
  height: 800px;
}

.product-carousel {
  width: 80%;
  margin: 20px auto;
  overflow: hidden;
  position: relative;

  .carousel {
    display: flex;
    transition: transform 0.5s ease;
  }

  .product-item {
    box-sizing: border-box;
    padding: 5px;
    img {
      width: 200px;
    }
  }
  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }
}
</style>
