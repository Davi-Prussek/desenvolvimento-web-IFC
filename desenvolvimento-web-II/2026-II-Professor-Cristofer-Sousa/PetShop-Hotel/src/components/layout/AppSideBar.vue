<template>
  <nav>
    <div class="flex">
      <RouterLink to="/pets">
        <i class="bi bi-heart me-2"/>
        Pets
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
