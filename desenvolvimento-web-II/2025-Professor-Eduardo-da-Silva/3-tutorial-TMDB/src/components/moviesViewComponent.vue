<script setup>
import Loading from 'vue-loading-overlay';
const isLoading = ref(false);

import { useGenreStore } from '@/stores/genre';

const genreStore = useGenreStore();

import { ref, onMounted } from 'vue';

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});
</script>
<template>
  <ul>
    <li
  v-for="genre in genreStore.genres"
  :key="genre.id"
  @click="listMovies(genre.id)"
  class="genre-item"
>
  {{ genre.name }}
</li>
  </ul>
  <span
  v-for="genre_id in movie.genre_ids"
  :key="genre_id"
  @click="listMovies(genre_id)"
>
  {{ genreStore.getGenreName(genre_id) }}
</span>
  <Loading v-model:active="isLoading" is-full-page />
</template>
