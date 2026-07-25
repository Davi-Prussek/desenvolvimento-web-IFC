import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { cafe } from "@/types/cafe"
export const AcervoDeCafeStore = defineStore(
  'coffee',
  () => {
const acervo = ref<cafe[]>([])
const melhorAvaliado = computed(() => {
  if (acervo.value.length == 0) {
    return<cafe> {
      nome: 'Lista ainda vazia',
      nota: '--',
      produtor: '',
    }
  } else {
  return acervo.value.reduce((acumulador, atual) => {
    return atual.nota > acumulador.nota ? atual : acumulador;
  })}
})
return {
  acervo,
  melhorAvaliado,
}
},
{
  persist: true,
}
)
