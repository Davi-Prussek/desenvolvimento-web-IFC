import { defineStore } from "pinia"
import { ref,computed } from "vue"
import type { avaliacao } from "@/types/avaliacao"

export const avaliacaoStore = defineStore('avaliacao', () => {
  const avaliacoes = ref<avaliacao[]>([])
  const total = computed(() => {
  return avaliacoes.value.length
})
const ultimaAvaliacao = computed(() => {

})
  return {
    avaliacoes,
    total,
  }
},
{
  persist: true
})
