<script setup>
import router from '@/router';
const rotas = router.getRoutes()
</script>

<template>
  <header>
    <router-link v-for="(rota, index) in rotas" :to="rota.path" :key="index">
      {{ rota.name }}
    </router-link>
  </header>
</template>

<style scoped>

</style>
