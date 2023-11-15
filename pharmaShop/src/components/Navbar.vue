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
      <i class="fa-regular fa-circle-question" style="color: #41aba9"></i>
      <button>Información</button>
      <i class="fa-solid fa-user" style="color: #41aba9"></i>
      <button>Iniciar Sesión</button>
    </nav>
    <div class="navbar-down">
      <img src="../images/logo-transparent.png" alt="Logo" class="img-logo" />
      <i class="fa-solid fa-cart-shopping" style="color: #41aba9"></i>
    </div>
    <div class="div-table">
      <table class="table-category">
        <tr>
          <th>Dental</th>
          <th>Cosmética</th>
          <th>Nutrición</th>
          <th>Bebé y Mamá</th>
          <th>Salud</th>
          <th>Higiene</th>
          <th>Óptica</th>
          <th>Ortopedia</th>
          <th>Mascotas</th>
          <th>Medicamentos</th>
        </tr>
      </table>
    </div>
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
  padding-top: 4px;
  width: 98vw;
  display: flex;
  justify-content: flex-end;
  button {
    color: gray;
    background-color: transparent;
    border: none;
  }
}
.div-table {
  width: 100vw;
  display: flex;
  justify-content: center;
  .table-category {
    width: 90vw;
    border: 2px solid #41aba9;
    tr {
      th {
        padding: 1em;
        border: 2px solid #41aba9;
      }
    }
  }
}

.navbar-down {
  width: 91vw;
  height: 13vh;
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
