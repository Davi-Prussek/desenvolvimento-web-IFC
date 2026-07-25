<template>
  <div class="bg-[#FBF9F5]">
    <div class="py-[2vw] px-[2vw] flex flex-col gap-[1.5vw]">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-[1.4vw] font-bold text-[#2D1B0E]"><i class="fi fi-rr-trophy"></i> Ranking Geral</h1>
          </div>
          <p class="text-[1.2vw] text-[#6B5B4E] mt-1">
            Classificação dos melhores cafés do campeonato.
          </p>
        </div>
        <div class="p-4 bg-white border border-[#E7DFD3] rounded-xl flex items-center gap-3 shrink-0">
          <div>
            <p class="text-[1.2vw] text-[#8A7A6B]">Total de Cafés Avaliados</p>
            <p class="text-[1.4vw] font-bold text-[#2D1B0E]">{{ acervo.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white max-h-[20vw] overflow-y-auto no-scrollbar border border-[#E7DFD3] rounded-2xl overflow-hidden">
        <div class="grid grid-cols-[80px_2fr_1.5fr_1.5fr_0.8fr] gap-x-20 px-5 py-3 text-[1.2vw] font-medium text-[#8A7A6B] border-b border-[#E7DFD3]">
          <span>Posição</span>
          <span>Café</span>
          <span>Produtor</span>
          <span>Nota Final (Média SCA)</span>
          <span>Ações</span>
        </div>
        <div
          v-for="(cafe, index) in ranking"
          :key="cafe.nome ?? index"
          class="grid grid-cols-[80px_2fr_1.5fr_1.5fr_0.8fr] gap-x-20 items-center px-5 py-7 border-b border-[#F1EBE0] last:border-b-0"
          :class="index % 2 === 0 ? 'bg-[#FDFBF6]' : 'bg-white'">
          <div>
            <span
              v-if="index < 3"
              class="w-8 h-8 flex items-center justify-center rounded-full p-[1vw] text-[1.2vw] font-bold"
              :class="medalClass(index)">
              {{ index + 1 }}
            </span>
            <span v-else class="text-[1.2vw] font-medium text-[#4A3B2D] pl-5">{{ index + 1 }}</span>
          </div>
          <div class="flex items-center gap-3 min-w-0">
            <div class="rounded-full bg-[#F3E9DA] justify-center ">
              <i class="text-[1.4vw] fi fi-rr-coffee-bean"></i>
            </div>
            <span class="font-semibold text-[#2D1B0E] text-[1.4vw] truncate">{{ cafe.nome }}</span>
          </div>
          <span class="text-[1.2vw] text-[#4A3B2D] truncate pr-2">{{ cafe.produtor }}</span>
          <div class="flex items-center gap-2">
            <span class="text-[1.2vw] font-bold text-[#2E7D32]">{{ Number(cafe.nota).toFixed(1) }}</span>
            <span class="flex text-[#D9A441] text-[1.4vw]">
              <span v-for="s in 5" :key="s">
                {{ starChar(Number(cafe.nota), s) }}
              </span>
            </span>
          </div>
          <div>
            <routerLink :to="`/desc/${cafe.nome}`"
              class=" px-4 py-2 rounded-lg border border-[#E7DFD3] text-[#4A3B2D] text-[1.2vw] font-medium hover:bg-[#2D1B0E] hover:text-white">
              Ver Detalhes
          </routerLink>
          </div>
        </div>

        <div v-if="ranking.length === 0" class="flex flex-col items-center justify-center gap-2 py-12">
          <i class="text-2xl fi fi-coffee"></i>
          <p class="text-sm text-[#8A7A6B]">Nenhum café avaliado ainda.</p>
        </div>
      </div>
      <div class="flex gap-3 p-4 bg-[#F6EFE3] border border-[#EFE3CC] rounded-xl">
        <i class="text-[1.4vw] fi fi-rr-badge"></i>
        <div class="text-[1.2vw] text-[#6B5B4E]">
          <p class="text-[1.4vw] font-semibold text-[#4A3B2D] mb-1">Como funciona a pontuação?</p>
          <p>As notas são baseadas na metodologia SCA (Specialty Coffee Association).</p>
          <p>Cada critério recebe uma nota de 0 a 10 e a média final determina a classificação.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AcervoDeCafeStore } from '@/stores/coffee';
import { RouterLink } from 'vue-router';

const AcervoDeCafe = AcervoDeCafeStore();
const acervo = AcervoDeCafe.acervo;

const ranking = computed(() => {
  return [...acervo].sort((a, b) => Number(b.nota) - Number(a.nota));
});

function medalClass(index: number) {
  return [
    'bg-[#F5C542] text-[#5A3F00]',
    'bg-[#C9CDD3] text-[#3D4147]',
    'bg-[#D8935B] text-[#4A2E12]',
  ][index];
}

function starChar(nota: number, position: number) {
  const stars = nota / 2;
  const full = Math.floor(stars);
  const hasHalf = stars - full >= 0.5;
  if (position <= full) return '★';
  if (position === full + 1 && hasHalf) return '⯨';
  return '☆';
}
</script>
