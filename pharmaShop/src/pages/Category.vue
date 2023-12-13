<template>
  <div>Prueba de Categoria</div>
</template>

<script>
export default {
  data() {
    return {
      category: null,
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      const userToken = JSON.parse(
        decodeURIComponent(Cookies.get("userToken"))
      );
      console.log("prueba");

      try {
        const currentRoute = this.$route;
        this.category = currentRoute.params.category;
        console.log(this.category);
        const response = await axios.get("http://localhost:8080/products/", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
