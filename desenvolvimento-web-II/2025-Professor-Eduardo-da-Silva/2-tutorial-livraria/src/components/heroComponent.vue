<script setup>
import { RouterLink } from 'vue-router';

import { importBooks } from '@/stores/books'
import featuredComponent from './featuredComponent.vue';

const { filteredBooks } = importBooks();
const showRandom = Math.floor(Math.random() * filteredBooks.length)
const featuredBook = filteredBooks[showRandom];
</script>

<template>
<section class="hero">
    <div class="hero-content">
      <h3 class="outlined">Livro destaque</h3>
      <h2>{{ featuredBook.title }}</h2>
      <p>{{ featuredBook.description }}</p>
      <button><RouterLink :to="{ name: 'Book', params: { id: featuredBook.id } }">Acessar página do livro</RouterLink></button>
    </div>
    <div class="hero-image">
      <img :src="featuredBook.cover" :alt="featuredBook.alt"/>
    </div>
  </section>
<featuredComponent/>
</template>
<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vh 9vw;
  border-bottom: 2px solid #27ae6099;

   h2 {
    color: #382c2c;
    font-size: 3rem;
    font-weight: 700;
  }

   .hero-content {
    width: 50%;
    padding-right: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

     h3.outlined {
      background-color: transparent;
      color: #27ae60;
      border: 2px solid #27ae60;
      padding: 15px 20px;
      border-radius: 5px;
      font-size: 1rem;
    }

     button {
      margin-top: 20px;
      a {
        text-decoration: none;
        color: white;
      }
    }

    p {
      width: 70%;
    }
  }

   .hero-image {
    width: 50%;
    text-align: right;
    padding-right: 4vw;

    & img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>