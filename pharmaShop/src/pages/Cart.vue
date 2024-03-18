<template>
  <section class="cart-container">
    <div class="checkout-container">
      <h1>Resumen</h1>
      <div class="total-container">
        <p class="total">
          Total (Impuestos incluidos)
          <span class="total-amount">{{ calculateTotal() }}</span
          ><span class="currency">€</span>
        </p>
      </div>
      <hr class="separator" />
      <button class="checkout-button">Realizar Pedido</button>
    </div>
    <div v-if="productsCart.length === 0" class="empty-cart">
      <p>El carrito está vacío.</p>
    </div>
    <div v-else class="product-container">
      <div
        v-for="(product, index) in productsCart"
        :key="index"
        class="product-subcontainer"
      >
        <div class="product-info">
          <img
            :src="product.image"
            alt="Product Image"
            class="product-image-large"
          />
          <div class="product-details">
            <p class="product-name">{{ product.name }}</p>

            <p class="product-price">Precio: {{ product.price }} €</p>
          </div>
          <div class="div-price">
            <div class="quantity-control">
              <button
                @click="decreaseQuantity(index)"
                class="quantity-button-less"
              >
                -
              </button>
              <input
                type="number"
                v-model.number="product.quantity"
                min="1"
                class="quantity-input"
              />
              <button
                @click="increaseQuantity(index)"
                class="quantity-button-more"
              >
                +
              </button>
            </div>
            <button @click="removeFromCart(index)" class="remove-button">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      userLogued: JSON.parse(decodeURIComponent(Cookies.get("userLogued"))),
      productsCart: [],
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    getCart() {
      const cartKey = `productsCart_${this.userLogued.id}`;
      this.productsCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      console.log(this.productsCart);
    },
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
.cart-container {
  width: 74%;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  margin-left: 0px;
  flex-direction: row-reverse;
}

.total-container {
  margin-bottom: 20px;
  padding: 20px;
}

.separator {
  width: 100%;
  margin: 10px 0;
  border: none;
  border-top: 2px dashed black;
}

.product-container {
  width: 74%;
}

.product-subcontainer {
  width: 80%;
  margin-bottom: 20px;
  border: 2px solid rgb(168, 168, 168);
  border-radius: 20px;
}

.product-info {
  display: flex;
}

.product-image-large {
  width: 250px;
  height: auto;
  margin-right: 20px;
  border-radius: 20px;
}

.product-details {
  flex-grow: 1;
  margin-top: 10px;
}
.div-price {
  margin-top: 10px;
}

.product-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-button {
  background-color: #66e0ca;
  color: #fff;
  border: none;
  border-radius: 7px 1px 1px 10px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
}

.quantity-button-less {
  background-color: #66e0ca;
  color: #fff;
  border: none;
  border-radius: 7px 1px 1px 10px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
}

.quantity-button-more {
  background-color: #66e0ca;
  color: #fff;
  border: none;
  border-radius: 1px 7px 7px 1px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
}
.quantity-input {
  width: 40px;
  text-align: center;
  border: none;
  outline: none;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.quantity-input {
  -moz-appearance: textfield;
}

.remove-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  margin-top: 10px;
}

.remove-button:hover {
  background-color: darkred;
}

.empty-cart {
  margin-top: 20px;
}

.total {
  font-weight: bold;
}

.total-amount {
  vertical-align: middle; /* Alinear verticalmente con el signo de euro */
}

.currency {
  vertical-align: middle; /* Alinear verticalmente con el total */
}

.checkout-container {
  width: 24%;
  margin-bottom: 20px; /* Aumentar el margen inferior */
  padding: 20px; /* Aumentar el padding para hacerlo más grande */
  border: 2px solid rgb(168, 168, 168);
  border-radius: 20px;
}

.checkout-button {
  background-color: #41aba9; /* Cambiar el color de fondo */
  color: white; /* Cambiar el color del texto */
  border: none;
  border-radius: 5px;
  padding: 12px 25px; /* Aumentar el padding */
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #218b8a; /* Cambiar el color al hacer hover */
}

.empty-cart {
  margin-top: 30px; /* Aumentar el margen superior */
}

@media (max-width: 1114px) {
  .product-subcontainer {
    width: 80%; /* Cambiar el ancho del producto para ocupar todo el ancho en pantallas pequeñas */
    margin-right: 0; /* Eliminar el margen derecho */
    margin-bottom: 20px; /* Agregar un margen inferior */
  }

  .product-image-large {
    width: 150px; /* Aumentar el tamaño de la imagen */
    margin-right: 20px; /* Ajustar el margen derecho */
  }

  .product-details {
    flex-grow: 1; /* Ajustar el crecimiento del contenedor de detalles */
  }

  .quantity-control {
    margin-top: 10px; /* Ajustar el margen superior */
    margin-bottom: 10px; /* Agregar un margen inferior */
  }
}

@media (max-width: 768px) {
  .cart-container {
    display: flex;
    flex-direction: column-reverse;
  }
  .product-subcontainer {
    width: 100%; /* Cambiar el ancho del producto para ocupar todo el ancho en pantallas pequeñas */
  }
}
</style>
