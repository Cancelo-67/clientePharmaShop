<template>
  <section>
    <article v-for="(product, index) in productsCart" :key="index">
      <div class="product-info">
        <img
          :src="product.imageUrl"
          alt="Product Image"
          class="product-image"
        />
        <div class="product-details">
          <p>{{ product.name }}</p>
          <div class="quantity-control">
            <button @click="decrementQuantity" class="quantity-button-less">
              -
            </button>
            <input type="number" v-model.number="product.quantity" min="1" />
            <button @click="incrementQuantity" class="quantity-button-more">
              +
            </button>
          </div>
          <p>Precio: ${{ product.price }}</p>
          <button @click="removeFromCart(index)">Eliminar</button>
        </div>
      </div>
    </article>
    <div v-if="productsCart.length === 0">
      <p>El carrito está vacío.</p>
    </div>
    <div v-else>
      <p>Total: ${{ calculateTotal() }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      productsCart: JSON.parse(localStorage.getItem("productsCart")) || [],
    };
  },
  methods: {
    removeFromCart(index) {
      this.productsCart.splice(index, 1);
      localStorage.setItem("productsCart", JSON.stringify(this.productsCart));
    },
    increaseQuantity(index) {
      this.productsCart[index].quantity++;
      localStorage.setItem("productsCart", JSON.stringify(this.productsCart));
    },
    decreaseQuantity(index) {
      if (this.productsCart[index].quantity > 1) {
        this.productsCart[index].quantity--;
        localStorage.setItem("productsCart", JSON.stringify(this.productsCart));
      }
    },
    calculateTotal() {
      return this.productsCart
        .reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0)
        .toFixed(2);
    },
  },
};
</script>

<style scoped>
.product-info {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.product-details {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
}

input[type="number"] {
  width: 50px;
  text-align: center;
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

button:hover {
  background-color: #ff7f50;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
