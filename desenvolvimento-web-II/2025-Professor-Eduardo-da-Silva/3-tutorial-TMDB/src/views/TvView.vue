<script setup>
import { ref, onMounted, computed } from 'vue';
import loading from "vue-loading-overlay";
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';
const store = useGenreStore();
const isLoading = ref(false);

const tv = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await store.getAllGenres('tv');
  isLoading.value = false;
});

 const listTv = async (genreId) => {
    store.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR'
      }
    });
  tv.value = response.data.results
  isLoading.value = false;
};

  const TOC_tv = computed(() => {
    return [...tv.value].sort((a,b) => a.name.localeCompare(b.name))})

  const TOC_genre = computed(() => {
    return [...store.genres].sort((a,b) => a.name.localeCompare(b.name));});

    listTv();
</script>

<template>

  <body>

    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li
      v-for="genre in TOC_genre"
      :key="genre.id"
      @click="listTv(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === store.currentGenreId }">
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="program-list">
      <div v-for="programs in TOC_tv" :key="programs.id" class="program-card">
        <img :src="`https://image.tmdb.org/t/p/w500${programs.poster_path}`" :alt="programs.name" />
        <div class="program-details">
          <p class="program-title">{{ programs.name }}</p>
          <p class="program-release-date">{{ store.formatDate(programs.first_air_date) }}</p>
          <p class="program-genres">
            <span
            v-for="genre_id in programs.genre_ids"
            :key="genre_id"
            @click="listTv(genre_id)"
            :class="{ active: genre_id === store.currentGenreId }">
              {{ store.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #92a042;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}

.program-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 2fr));
  row-gap: 2.5vw;
  column-gap: 1vw;
}

.program-card {
  width: 15rem;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.program-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.program-details {
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5vw;
}

.program-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  margin-bottom: 1vw;
}
.program-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: left;
  gap: 0.2rem;
  padding-top: 0.5vw;
}

.program-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.program-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
.active {
  background-color: #bece5f;
  font-weight: bolder;
}
.program-genres span.active {
  background-color: #bece5f;
  color: #ffffff;
  font-weight: bolder;
}
</style>
