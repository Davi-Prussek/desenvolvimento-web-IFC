<script setup lang="ts">
import router from '@/router';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute()

function estiloAtual(path: string) {
  return path === route.path
    ? {
        texto: '#ac7945',
        icone: '#ac7945',
        borda: '#ac7945'
      }
    : {
        texto: '#6B7280',
        icone: '#6B7280',
        borda: 'transparent'
      }
}
const rotas = router.getRoutes().slice(1, 5)
</script>

<template>
<header class="flex justify-between px-[2vw] border-b-2 border-[#dedede] border-solid h-[5vw] items-end">
    <RouterLink class="flex items-baseline-last gap-[1.3vw]" to="/">
      <img class="h-full max-h-[3.5vw] w-auto object-contain mb-[1vw]" src="../../public/icons/xicara.png" alt="logo"/>
      <h2 class="font-bold text-[#3E1E04] text-[1.4vw]">COFFEE QUALITY<br>CHALLENGE</h2>
    </RouterLink>
  <div>
    <ul class="flex text-[1.4vw] gap-[2vw]">
      <li v-for="rota in rotas" :key="rota.name" class="border-b-[3px] border-solid pb-[2vw] hover:border-[#ac7945]" :style="{ borderColor: estiloAtual(rota.path).borda }">
  <RouterLink :to="rota.path" class="flex gap-[1vw]" :style="{ color: estiloAtual(rota.path).texto }">
    <i :class="rota.meta.icon" :style="{ color: estiloAtual(rota.path).icone }"/>
    {{ rota.name }}
  </RouterLink>
</li>
    </ul>
  </div>
  <div></div>
</header>
</template>
