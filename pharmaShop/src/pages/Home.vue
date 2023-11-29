<template>
  <div class="container-all">
    <section class="section1">
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
    </section>
    <section class="section3">
      <h2>EN PROMOCIÓN</h2>
      <hr class="separator-horizontal" />
    </section>
    <section class="section4">
      <h2>MARCAS MAS BUSCADAS</h2>
      <hr class="separator-horizontal" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: ["/src/images/imagen1.png", "/src/images/imagen1.png"],
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
.section1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
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

.carousel {
  position: relative;
  text-align: center;

  img {
    height: 800px;
    max-height: 100vh;
    margin: 0 auto;
    width: 5;
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
