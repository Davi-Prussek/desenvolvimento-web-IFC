<script setup>
import { RouterLink,useRouter } from 'vue-router';
const router = useRouter()
const routes = router.getRoutes();


</script>
<template>
  <header>
<nav>
  <RouterLink v-for="(rotas, index) in routes.slice(1,4)" :key="index" :to="rotas.path">
    {{ rotas.name }}
  </RouterLink>
</nav>
</header>
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  a {
  text-decoration: none;
  color: #fff;
}
}
</style>
