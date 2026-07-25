<template>
  <div class="bg-[#FBF9F5]">
    <div class="py-[2vw] px-[2vw] flex flex-col gap-[1.5vw]">

      <div class="flex items-center gap-2 px-2">
        <h1 class="text-[1.4vw] font-bold text-[#2D1B0E]">Avaliações de Cafés</h1>
      </div>
      <p class="text-[1.2vw] text-[#6B5B4E] px-2 -mt-[1vw]">
        Veja os cafés já avaliados e adicione uma nova avaliação.
      </p>
      <div class="flex gap-[1.5vw]">
        <div class="basis-1/3 min-w-0 p-[1.5vw] bg-white border border-[#E7DFD3] rounded-2xl h-fit">
          <h2 class="text-[1.4vw] font-semibold text-[#2D1B0E] mb-3">
            Cafés Avaliados ({{ avaliacoesComProdutor.length }})
          </h2>
          <div v-if="avaliacoesComProdutor.length" class="flex flex-col gap-3">
            <div v-for="(item, index) in avaliacoesComProdutor" :key="index"
              class="flex items-baseline justify-between p-3 bg-[#FBF9F5] border border-[#EFE7DA] rounded-xl">
              <i class="fi fi-rr-coffee-bean text-[1.4vw] text-[#2D1B0E]"></i>
              <div>
                  <p class="font-medium text-[#2D1B0E] text-[1.4vw] truncate">{{ item.nome }}</p>
                  <p class="text-[1.2vw] text-[#8A7A6B] truncate">Produtor: {{ item.produtor }}</p>
                  <p class="text-[1.2vw] text-[#8A7A6B]">Avaliado em: {{ item.data }}</p>
              </div>
              <div>
                <p class="text-[1.2vw] text-[#8A7A6B]">Média SCA</p>
                <p class="text-[1.4vw] font-bold text-[#2E7D32]">{{ item.media.toFixed(1) }}</p>
              </div>
            </div>
          </div>
          <div v-else
            class="flex flex-col items-center justify-center text-center gap-2 py-10 border border-dashed border-[#E7DFD3] rounded-xl">
            <i class="fi fi-coffee text-[1.4vw]"></i>
            <p class="text-[1.2vw] text-[#8A7A6B]">Nenhum café avaliado ainda.</p>
            <p class="text-[1.2vw] text-[#8A7A6B]">Adicione sua primeira avaliação ao lado.</p>
          </div>
        </div>

        <form @submit.prevent="salvarAvaliacao"
          class="basis-2/3 min-w-0 p-[1.5vw] bg-white border border-[#E7DFD3] rounded-2xl flex flex-col gap-4">
          <div class="flex items- gap-2">
            <i class="text-[1.4vw] fi fi-rr-clipboard-list"></i>
            <h2 class="text-[1.4vw] font-semibold text-[#2D1B0E]">Nova Avaliação</h2>
          </div>

          <div class="flex gap-[1vw] justify-start">
            <selectComponent class="flex-1  flex-col" color-text="#2D1B0E" v-model="nome_cafe_avaliado" :options="acervo.map(cafe => cafe.nome).filter((n): n is string => n !== null)" default="Selecione o café" label="Nome do Café" id="nomeCafe" />
            <textInputComponent class="flex-1" color-text="#2D1B0E" :model-value="cafeSelecionado?.produtor ?? null" label="Produtor"
              id="produtor" placeholder="Selecione um café" disabled />
          </div>

          <div>
            <p class="text-[1.4vw] font-medium text-[#4A3B2D] mb-10">Notas SCA (0 a 10)</p>
            <div class="grid grid-cols-5 gap-3">
              <numberInputComponent color-text="#2D1B0E" v-model="aroma" label="Aroma" id="aroma" :min="0" :max="10"
                :step="0.1" />
              <numberInputComponent color-text="#2D1B0E" v-model="sabor" label="Sabor" id="sabor" :min="0" :max="10"
                :step="0.1" />
              <numberInputComponent color-text="#2D1B0E" v-model="acidez" label="Acidez" id="acidez" :min="0"
                :max="10" :step="0.1" />
              <numberInputComponent color-text="#2D1B0E" v-model="corpo" label="Corpo" id="corpo" :min="0" :max="10"
                :step="0.1" />
              <numberInputComponent color-text="#2D1B0E" v-model="finalizacao" label="Finalização" id="finalizacao"
                :min="0" :max="10" :step="0.1" />
            </div>
          </div>

          <div class="flex flex-col gap-[0.4vw]">
            <label class="text-[1.2vw] text-[#2D1B0E]" for="comentario">Observações</label>
            <textarea id="comentario" v-model="comentario" maxlength="300" rows="3"
              placeholder="Digite suas observações sobre o café..."
              class="border-2 border-[#dedede] border-solid rounded-md p-[0.5vw] px-[1vw] text-[1.2vw] resize-none text-[#2D1B0E]" />
            <p class="self-end text-[1vw] text-[#B0A493]">{{ comentario?.length ?? 0 }}/300</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-[#FBF3DD] border border-[#F0E3BC] rounded-xl">
              <p class="text-[1.2vw] text-[#8A7A4A]">Média SCA (calculada automaticamente)</p>
              <p class="text-[1.4vw] font-bold text-[#2E7D32] mt-1">{{ mediaSca.toFixed(1) }}</p>
            </div>
            <div
              class="p-4 bg-[#FBF9F5] border border-[#EFE7DA] rounded-xl text-[0.8vw] text-[#6B5B4E] flex gap-2 items-center">
              <span>
                A média é calculada com base na soma das 5 notas dividida por 5.
                (Aroma + Sabor + Acidez + Corpo + Finalização) / 5
              </span>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="limparFormulario"
              class="px-4 py-2 rounded-lg border border-[#E7DFD3] text-[#4A3B2D] text-[1.2vw] font-medium hover:bg-[#FBF9F5]">
              ↺ Limpar
            </button>
            <button type="submit" :disabled="!nome_cafe_avaliado"
              class="px-4 py-2 rounded-lg bg-[#6B3A1F] text-white text-[1.2vw] font-medium hover:bg-[#5A3019] disabled:opacity-50 disabled:cursor-not-allowed">
              Salvar Avaliação
            </button>
          </div>
        </form>
      </div>

      <div class="flex gap-3 p-4 bg-[#F6EFE3] border border-[#EFE3CC] rounded-xl">
        <span class="text-[1.4vw]">⭐</span>
        <div class="text-[1.2vw] text-[#6B5B4E]">
          <p class="font-semibold text-[1.4vw] text-[#4A3B2D] mb-1">Dicas:</p>
          <ul class="list-disc list-inside space-y-0.5">
            <li>Todas as notas devem estar entre 0 e 10.</li>
            <li>A média será atualizada automaticamente conforme você altera as notas.</li>
            <li>Após salvar, o café será adicionado à lista e ao ranking automaticamente.</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import numberInputComponent from '@/components/forms/numberInputComponent.vue';
import selectComponent from '@/components/forms/selectComponent.vue';
import textInputComponent from '@/components/forms/textInputComponent.vue';
import { AcervoDeCafeStore } from '@/stores/coffee';

const AcervoDeCafe = AcervoDeCafeStore();
const acervo = AcervoDeCafe.acervo;

const nome_cafe_avaliado = ref<string | null>(null);
const aroma = ref<number | null>(0);
const sabor = ref<number | null>(0);
const acidez = ref<number | null>(0);
const corpo = ref<number | null>(0);
const finalizacao = ref<number | null>(0);
const comentario = ref<string | null>(null);

const cafeSelecionado = computed(() =>
  acervo.find(c => c.nome === nome_cafe_avaliado.value) ?? null
);

const mediaSca = computed(() => {
  const vals = [aroma.value, sabor.value, acidez.value, corpo.value, finalizacao.value].map(v => v ?? 0);
  return vals.reduce((a, b) => a + b, 0) / 5;
});

function notaDaAvaliacao(a: { aroma: number; sabor: number; acidez: number; corpo: number; finalização: number }) {
  return (a.aroma + a.sabor + a.acidez + a.corpo + a.finalização) / 5;
}

function recalcularNotaDoCafe(cafe: (typeof acervo)[number]) {
  if (!cafe.avaliacoes.length) {
    cafe.nota = 0;
    return;
  }
  const soma = cafe.avaliacoes.reduce((acc, a) => acc + notaDaAvaliacao(a), 0);
  cafe.nota = Number((soma / cafe.avaliacoes.length).toFixed(1));
}

const avaliacoesComProdutor = computed(() => {
  return acervo
    .flatMap(cafe =>
      cafe.avaliacoes.map(a => ({
        nome: cafe.nome,
        produtor: cafe.produtor ?? '—',
        data: new Date(a.data_avaliacao).toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
        }),
        media: notaDaAvaliacao(a),
        rawData: a.data_avaliacao,
      }))
    )
    .sort((a, b) => new Date(b.rawData).getTime() - new Date(a.rawData).getTime());
});

function limparFormulario() {
  nome_cafe_avaliado.value = null;
  aroma.value = 0;
  sabor.value = 0;
  acidez.value = 0;
  corpo.value = 0;
  finalizacao.value = 0;
  comentario.value = null;
}

function salvarAvaliacao() {
  const cafe = cafeSelecionado.value;
  if (!cafe) return;

  cafe.avaliacoes.push({
    nome_cafe_avaliado: cafe.nome ?? '',
    data_avaliacao: new Date(),
    aroma: aroma.value ?? 0,
    sabor: sabor.value ?? 0,
    acidez: acidez.value ?? 0,
    corpo: corpo.value ?? 0,
    finalização: finalizacao.value ?? 0,
    comentario: comentario.value ?? '',
  });

  recalcularNotaDoCafe(cafe);
  limparFormulario();
}
</script>
