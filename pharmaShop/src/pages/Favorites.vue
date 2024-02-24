<template>
  <div>Favoritos</div>
</template>

<script>
export default {
  data() {
    return {
      favItems: JSON.parse(localStorage.getItem("favItems")) || [],
    };
  },
};
</script>

<style lang="sass" scoped></style>
