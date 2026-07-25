<script setup>
import { onMounted, ref } from 'vue';
import desktopView from './views/desktopView.vue';
import cellView from './views/cellView.vue';
const show = ref(null);
const verTamanho=()=>show.value = (window.innerWidth > 950) ? desktopView : cellView;
onMounted(() => {verTamanho();window.addEventListener('resize',verTamanho)});
</script>
<template>
  <component :is="show"/>
</template>
