<script setup>
  import Loading from 'vue-loading-overlay';
  const isLoading = ref(false);
import { ref } from 'vue';
import api from '@/plugins/axios';
const tv = ref([]);
const listMovies = async (genreId) => {
let response = await api.get(
"discover/movie", {
  params: {
  with_genres: genreId,
  language: "pt-BR"}});
tv.value = response.data.results;
  }
</script>
<template>
<ul>
  <li
    v-for="genre in tv"
    :key="genre.id"
    @click="listMovies(genre.id)"
    class="genre-item"
  >
    {{ genre.name }}
  </li>
</ul>
<Loading v-model:active="isLoading" is-full-page />
</template>
