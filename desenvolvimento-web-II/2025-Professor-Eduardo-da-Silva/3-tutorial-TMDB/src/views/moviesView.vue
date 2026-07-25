  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import router from '@/router';
  import api from '@/plugins/axios';
  import Loading from "vue-loading-overlay";
  import { useGenreStore } from "@/stores/genre";
  const store = useGenreStore()
  const isLoading = ref(false);

  const movies = ref([]);

  onMounted(async () => {
    isLoading.value = true;
  await store.getAllGenres('movie');
  isLoading.value = false;
  });

  const listMovies = async (genreId) => {
    store.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/movie', {
      params: {
        with_genres: genreId,
        language: 'pt-BR'
      }
    });
    movies.value = response.data.results
    isLoading.value = false;
  };

  const TOC_movie = computed(() => {
    return [...movies.value].sort((a,b) => a.title.localeCompare(b.title))})

  const TOC_genre = computed(() => {
  return [...store.genres].sort((a, b) => a.name.localeCompare(b.name));});

  const openMovie = (movieId) => {
  router.push( { name:  "movieDetails", params: {movieId}});
   }
listMovies()
</script>
  <template>
    <h1>Filmes</h1>
    <ul class="genre-list">
      <li v-for="genre in TOC_genre"
       :key="genre.id"
        @click="listMovies(genre.id)"
         class="genre-item"
         :class="{ active: genre.id === store.currentGenreId }"
         >
        {{ genre.name }}
      </li>
    </ul>
    <Loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
      <div v-for="movie in TOC_movie" :key="movie.id" class="movie-card">
        <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        @click="openMovie(movie.id)"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ store.formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
            :class="{ active: genre_id === store.currentGenreId }">
              {{ store.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
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
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 2fr));
  row-gap: 2.5vw;
  column-gap: 1vw;
}

.movie-card {
  width: 15rem;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
  cursor: pointer;
}

.movie-details {
  padding: 0 0.5rem;
  padding-bottom: 0.5vw;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  margin-top: 1vw;
  margin-bottom: 1vw;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: left;
  gap: 0.2rem;
  padding-top: 0.5vw;
}

.movie-genres span {
  background-color: #387250;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}
.active {
  background-color: #67b086;
  font-weight: bolder;
}
.movie-genres span.active {
  background-color: #89e5af;
  color: #ffffff;
  font-weight: bolder;
}
</style>
