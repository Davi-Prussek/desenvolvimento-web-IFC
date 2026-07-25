<script setup>
import { RouterLink } from 'vue-router';
import router from '@/router';
const rotas = router.getRoutes()
</script>

<template>
<header>
  <nav>
    <router-link v-for="(rota, index) in rotas" :to="rota.path" :key="index">
      {{ rota.name }}
    </router-link>
  </nav>
</header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  background-color: #f8f8f8;
  z-index: 100;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
nav {
  display: flex;
  gap: 16px;
}
a {
  text-decoration: none;
  color: #333;
}
.router-link-active {
  font-weight: bold;
}
</style>
