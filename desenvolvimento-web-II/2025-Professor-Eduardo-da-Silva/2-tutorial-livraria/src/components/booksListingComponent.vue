<script setup>
import { useCart } from '@/stores/cart';
import { importBooks } from '@/stores/books';

const { addToCart } = useCart();
const bookStore  = importBooks();

function openBook(id) {
  router.push({ name: 'Book', params: { id } });
}

import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <section class="books">
    <article class="book" v-for="book in bookStore.filteredBooks" :key="book.id">
      <img :src="book.cover" :alt="book.title" @click="openBook(book.id)" />
      <h2>{{ book.title }}</h2>
      <p class="book-author">{{ book.author }}</p>
      <span class="price-and-like">
        <p class="book-price">R$ {{ book.price.toFixed(2) }}</p>
        <span class="mdi mdi-heart-outline"></span>
      </span>
      <button @click="addToCart(book)">
        <span class="mdi mdi-cart"></span>Comprar
      </button>
    </article>
  </section>
</template>

<style scoped>
.books {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 5vh 8vw;
  gap: 20px;
  .book {
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: calc(100% / 4 - 42px);
    padding-inline: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    position: relative;
    transition: all 1s ease;
    margin-inline: 5px;
    box-sizing: border-box;
    border-radius: 15px;
    img {
        margin-inline: 5px;
        border-radius: 10px;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .book-author {
      font-size: 1rem;
    }

    .book-price {
      font-size: 1.2rem;
      font-weight: 700;
    }

    .price-and-like {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .mdi-heart-outline {
        font-size: 1.3rem;
        color: #27ae60;
      }
    }
  }
}
.book:hover {
  transform: scale(1.02);
  box-shadow: 0px 10px 20px rgba(39, 174, 96, 0.5);
  z-index: 10;
}
</style>