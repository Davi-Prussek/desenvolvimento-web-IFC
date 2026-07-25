<script setup>
import cartComponent from '@/components/cartComponent.vue';
import { useCart } from '@/stores/cart'
import { RouterLink, useRoute } from 'vue-router';
import { importBooks } from '@/stores/books';

const bookStore = importBooks();

const route = useRoute();
const cartStore = useCart();

</script>

<template>
  <header>
    <nav>
      <h1>
        <RouterLink to="/">
          IFbooks
          <span class="logo-title"> Apreço a livros </span>
        </RouterLink>
      </h1>
      <div class="search-wrapper">
        <input
          v-model="bookStore.filterText"
          type="text"
          class="search"
          placeholder="Buscar..."
        />
      </div>
      <ul>
        <li :style="{ backgroundColor: route.path == '/termos' ? '#27ae6099' : '' }">
          <RouterLink to="/termos" :style="{ color: route.path == '/termos' ? 'white' : '' }">Termos</RouterLink>
        </li>
        <li :style="{ backgroundColor: route.path == '/equipe' ? '#27ae6099' : '' }">
          <RouterLink to="/equipe" :style="{ color: route.path == '/equipe' ? 'white' : '' }">Equipe</RouterLink>
        </li>
        <li :style="{ backgroundColor: route.path == '/envio' ? '#27ae6099' : '' }">
          <RouterLink to="/envio" :style="{ color: route.path == '/envio' ? 'white' : '' }">Envio</RouterLink>
        </li>
        <li :style="{ backgroundColor: route.path == '/devolucoes' ? '#27ae6099' : '' }">
          <RouterLink to="/devolucoes" :style="{ color: route.path == '/devolucoes' ? 'white' : '' }">Devoluções</RouterLink>
        </li>
      </ul>
      <ul class="icons">
        <li @click="cartStore.showCart = !cartStore.showCart"><span class="mdi mdi-cart"></span></li>
        <li><span class="mdi mdi-heart"></span></li>
        <li><span class="mdi mdi-account"></span></li>
      </ul>
    </nav>
  </header>

  <main v-if="cartStore.showCart">
    <cartComponent/>
  </main>
</template>

<style scoped>
header {
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vh 8vw;
    border-bottom: 2px solid #27ae6099;

    h1 {
      font-size: 1.3rem;
      color: #000;

      a {
        text-decoration: none;
        color: #000;
        display: flex;
        align-items: center;
      }

      .logo-title {
        border-left: 1px solid #27ae6099;
        font-size: 0.8rem;
        margin-left: 10px;
        padding-left: 10px;
        color: #27ae6099;
        width: 100px;
        line-height: 1rem;
      }
    }

    input {
      width: 400px;
      height: 40px;
      border-radius: 5px;
      font-size: 1rem;
      border: 0;
      background-color: #f1f1f1;
      padding: 5px;
    }

    ul {
      display: flex;
    }

    ul {
      li {
        border-radius: 15px;
        list-style: none;
        margin: 0 5px;
        font-size: 1rem;

        a {
          padding-inline: 6px;
          text-decoration: none;
          color: #000;
        }
      }
    }

    .icons li {
      color: #27ae60;
      font-size: 1.3rem;
      span {
        cursor: pointer;
      }
    }

    .search-wrapper {
      position: relative;
    }

    .search-wrapper::before {
      content: '󰍉';
      font-family: 'Material Design Icons';
      font-size: 1.2rem;
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .search {
      padding-right: 2rem;
    }
  }
}
</style>