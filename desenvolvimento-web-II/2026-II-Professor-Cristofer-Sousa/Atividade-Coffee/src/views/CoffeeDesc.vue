<template>
  <div class="min-h-screen bg-[#FBF9F5]">
    <div class="py-[2vw] px-[2vw] flex flex-col gap-[1.5vw]">

      <RouterLink
        class="text-[1.4vw] border-solid border-[2px] w-max p-[0.8vw] rounded-lg bg-[#ffffff] border-[#e8e8e8] hover:bg-[#e6e6e6]"
        to="/ranking">Voltar para os Rankings</RouterLink>

      <div v-if="!cafe" class="p-8 text-center text-[#8A7A6B] bg-white border border-[#E7DFD3] rounded-2xl">
        Café não encontrado.
      </div>

      <template v-else>
        <div class="flex items-center justify-between gap-4 p-6 bg-white border border-[#E7DFD3] rounded-2xl">
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-16 h-16 shrink-0 rounded-full bg-[#F3E9DA] flex items-center justify-center text-[1.4vw]">
              <i class="fi fi-rr-coffee-bean"></i>
            </div>
            <div class="min-w-0">
              <h1 class="text-[1.4vw] font-bold text-[#2D1B0E] truncate">{{ cafe.nome }}</h1>
              <p class="text-[1.2vw] text-[#6B5B4E]">Produtor: {{ cafe.produtor }}</p>
            </div>
          </div>

          <div class="p-3 bg-[#FBF3DD] border border-[#F0E3BC] rounded-xl text-center shrink-0">
            <p class="text-[1.2vw] text-[#8A7A4A]">Nota Final (Média SCA)</p>
            <p class="text-[1.4vw] font-bold text-[#2E7D32] mt-1">
              {{ Number(cafe.nota).toFixed(1) }} <span class="text-[1.4vw]"></span>
            </p>
          </div>
        </div>

        <!-- Notas por critério (médias) -->
        <div class="p-5 bg-white border border-[#E7DFD3] rounded-2xl">
          <h2 class="font-semibold text-[#2D1B0E] mb-4 text-[1.4vw]">Notas por Critério</h2>
          <div class="grid grid-cols-5 gap-4">
            <div v-for="c in criterios" :key="c.label" class="flex flex-col gap-1">
              <span class="flex items-center gap-1 text-[1.4vw] text-[#4A3B2D]">
                {{ c.label }}
              </span>
              <span class="text-[1.4vw] font-bold text-[#2D1B0E]">{{ c.valor.toFixed(1) }}</span>
            </div>
          </div>
        </div>
        <div class="p-5 bg-white border border-[#E7DFD3] rounded-2xl flex flex-col gap-4">
          <div class="flex items-center justify-between gap-4">
            <h2 class="font-semibold text-[#2D1B0E] text-[1.4vw]">
              Avaliações ({{ avaliacoesFiltradas.length }})
            </h2>
            <input v-model="busca" type="text" placeholder="Buscar:"
              class="border-2 border-[#dedede] border-solid rounded-md px-3 py-1.5 text-[1.4vw] w-72 max-w-full text-[#2D1B0E]" />
          </div>

          <div v-if="avaliacoesFiltradas.length" class="flex flex-col gap-3">
            <div v-for="(a, idx) in avaliacoesFiltradas" :key="idx"
              class="flex gap-3 p-4 bg-[#FBF9F5] border border-[#EFE7DA] rounded-xl">
              <div class="flex justify-between w-full px-[2vw]">
                <div class="flex-1/3">
                  <p class="text-[1.4vw] font-medium text-[#8A7A6B] mb-1">Observações do Juiz</p>
                  <p class="text-[1.2vw] text-[#2D1B0E]">{{ a.comentario || '—' }}</p>
                </div>
                <div class="flex-1/3 grid grid-cols-5 gap-3 pt-3 border-t border-[#EFE7DA]">
                  <div v-for="c in notasDaAvaliacao(a)" :key="c.label" class="flex flex-col gap-0.5">
                    <span class="text-[1vw] text-[#8A7A6B]">{{ c.label }}</span>
                    <span class="text-[1.2vw] font-bold text-[#2D1B0E]">{{ c.valor.toFixed(1) }}</span>
                  </div>
                </div>
                <div class="flex items-end flex-col flex-1/3 gap-3">
                    <div>
                      <p class="text-[1.4vw] text-[#8A7A6B]">Data da Avaliação</p>
                      <p class="text-[1.2vw] text-[#2D1B0E]">{{ formatarData(a.data_avaliacao) }}</p>
                    </div>
                </div>
              </div>

            </div>
          </div>

          <div v-else class="text-center text-[1.2vw] text-[#8A7A6B] py-8">
            Nenhuma avaliação encontrada para "{{ busca }}".
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AcervoDeCafeStore } from '@/stores/coffee';
import { RouterLink } from 'vue-router';
const route = useRoute();
const AcervoDeCafe = AcervoDeCafeStore();
const acervo = AcervoDeCafe.acervo;

const cafe = computed(() =>
  acervo.find(c => c.nome === route.params.id) ?? null
);

function media(chave: 'aroma' | 'sabor' | 'acidez' | 'corpo' | 'finalização') {
  const lista = cafe.value?.avaliacoes ?? [];
  if (!lista.length) return 0;
  return lista.reduce((acc, a) => acc + a[chave], 0) / lista.length;
}

const criterios = computed(() => [
  { label: 'Aroma', valor: media('aroma') },
  { label: 'Sabor', valor: media('sabor') },
  { label: 'Acidez', valor: media('acidez') },
  { label: 'Corpo', valor: media('corpo') },
  { label: 'Finalização', valor: media('finalização') },
]);

const busca = ref('');

const avaliacoesFiltradas = computed(() => {
  const lista = [...(cafe.value?.avaliacoes ?? [])]
    .sort((a, b) => new Date(b.data_avaliacao).getTime() - new Date(a.data_avaliacao).getTime());

  const termo = busca.value.trim().toLowerCase();
  if (!termo) return lista;

  return lista.filter(a =>
    a.comentario?.toLowerCase().includes(termo) ||
    formatarData(a.data_avaliacao).toLowerCase().includes(termo)
  );
});

function formatarData(data: Date) {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
function notasDaAvaliacao(a: {
  aroma: number
  sabor: number
  acidez: number
  corpo: number
  finalização: number
}) {
  return [
    { label: 'Aroma', valor: a.aroma },
    { label: 'Sabor', valor: a.sabor },
    { label: 'Acidez', valor: a.acidez },
    { label: 'Corpo', valor: a.corpo },
    { label: 'Finalização', valor: a.finalização },
  ];
}
</script>
