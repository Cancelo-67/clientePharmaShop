<template>
  <section class="container">
    <article class="images">
      <div class="carousel-container">
        <div class="carousel">
          <img :src="currentImage" alt="Slide" />
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
          <img
            src="https://www.sago.es/wp-content/uploads/2015/02/invisol-compo-300x300.png"
            alt=""
          />
        </article>
        <article>
          <img
            src="https://www.shutterstock.com/image-photo/covid-vaccine-health-medicine-healthcare-260nw-2267533107.jpg"
            alt=""
          />
        </article>
        <article>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQZMHv_t4BAyCvpCOEf02i-UyhvzYX7eYFg&usqp=CAU"
            alt=""
          />
        </article>
        <article>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAw-YBvRsVYuL1OL9iTdkm6c98YcC683wI9w&usqp=CAU"
            alt=""
          />
        </article>
      </div>
    </article>
    <article>
      <h2>Destacados</h2>
      <hr class="separator-horizontal" />
    </article>
    <article></article>
    <article></article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://www.nationalgeographic.com.es/medio/2022/10/10/tierra-de-fuego_63adbec1_800x800.jpg",
        "https://www.vientonortesur.org/wp-content/uploads/2022/05/indonesia-800x900-1.jpg",
        // Agrega más URLs de imágenes según sea necesario
      ],
      currentImageIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  mounted() {
    setInterval(this.nextImage, 5000);
  },
  methods: {
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
    goToImage(index) {
      this.currentImageIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-image: url("../images/fondo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.images {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  justify-self: center;
  .home-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 57%;
  }
}
.carousel-container {
  left: 10px; /* Ajusta según sea necesario */
  top: 50%;
  width: 523px; /* Ajusta según sea necesario */
  height: 627px;
}

.carousel {
  position: relative;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 100vh;
    margin: 0 auto;
  }

  .separator-horizontal {
    flex-grow: 1;
    height: 1px;
    background-color: #000; /* Ajusta el color según tu diseño */
    margin: 0 10px; /* Ajusta el margen según sea necesario */
  }
  .indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      cursor: pointer;
    }

    .active {
      background-color: #333;
    }
  }
}
</style>
