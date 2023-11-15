<template>
  <div class="navbar">
    <nav class="navbar-up">
      <div>
        <p>PharmaShop-Lideres en confianza</p>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
        <i class="fa-solid fa-star" style="color: #ffffff"></i>
      </div>
      <div>
        <i class="fa-solid fa-truck-fast" style="color: #ffffff"></i>
        <p>Tus productos en casa en solo 24 - 48 horas</p>
      </div>
      <div>
        <i class="fa-solid fa-phone" style="color: #ffffff"></i>
        <p>111 111 111</p>
        <i class="fa-brands fa-whatsapp" style="color: #ffffff"></i>
        <p>111 111 111</p>
      </div>
    </nav>
    <nav class="navbar-center">
      <i class="fa-solid fa-user" style="color: #41aba9"></i>
      <button>Información</button>
      <i class="fa-regular fa-circle-question" style="color: #41aba9"></i>
      <button>Iniciar Sesión</button>
    </nav>
    <div class="navbar-down">
      <img src="../images/logo-transparent.png" alt="" class="img-logo" />
      <i class="fa-solid fa-cart-shopping" style="color: #41aba9"></i>
    </div>
    <nav class="nav-category">
      <p class="category-item">Dental</p>
      <p class="category-item">Cosmetica</p>
      <p class="category-item">Nutrición</p>
      <p class="category-item">Bebé y Mamá</p>
      <p class="category-item">Salud</p>
      <p class="category-item">Higiene</p>
      <p class="category-item">Óptica</p>
      <p class="category-item">Ortopedia</p>
      <p class="category-item">Mascotas</p>
      <p class="category-item">Medicamentos</p>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  background-image: url("../images/fondo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.navbar-up {
  padding: 4px;
  color: white;
  background-color: #41aba9;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  div:last-child {
    display: flex;
    justify-content: space-between;
    width: 17%;
  }
}
.navbar-center {
  display: flex;
  justify-content: end;
  button {
    color: gray;
    background-color: transparent;
    border: none;
  }
}
.nav-category {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 0% 1em;
  align-items: center;
}

.category-item {
  font-size: 15px;
  padding: 0.6em 1.3em; /* Ajustar según sea necesario */
  border: 1px solid #41aba9;
  max-width: 150px; /* Ajustar según sea necesario */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.navbar-down {
  width: 91vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    font-size: 45px;
  }
}
.img-logo {
  width: 15%;
}
</style>
