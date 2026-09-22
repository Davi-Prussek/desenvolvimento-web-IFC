<template>
<div>
    <!-- As a link -->
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
  </div>
</nav>

<!-- As a heading -->
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Navbar</span>
  </div>
</nav>
<div class="container-fluid">
  <router-link class="navbar-brand" to="/pets">

  </router-link>
</div>
</div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
