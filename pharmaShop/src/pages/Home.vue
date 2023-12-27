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
      <div class="product-carousel">
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
            </div>
          </div>
        </div>
        <button class="nav-button prev" @click="prevProductSlide">
          <i class="fa-solid fa-chevron-left" style="color: #000000"></i>
        </button>
        <button class="nav-button next" @click="nextProductSlide">
          <i class="fa-solid fa-chevron-right" style="color: #000000"></i>
        </button>
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
      images: ["/src/images/imagen1.png", "/src/images/imagen1.png"],
      currentImageIndex: 0,
      products: [],
      currentProductSlide: 0,
      itemWidth: 300,
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
</style>
