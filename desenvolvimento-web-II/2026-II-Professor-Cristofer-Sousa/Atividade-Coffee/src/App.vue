<script setup lang="ts">
  import NavBarComponent from './components/NavBarComponent.vue';
  import { RouterView } from 'vue-router';

</script>
<template>
<div class="my-[1vw] mx-[2vw] pt-[2vw] border-2 border-[#dedede] border-solid bg-white rounded-xl">
    <NavBarComponent/>
  <RouterView>
</RouterView>
  <main>
  </main>
  <footer>
  </footer>
</div>
</template>
