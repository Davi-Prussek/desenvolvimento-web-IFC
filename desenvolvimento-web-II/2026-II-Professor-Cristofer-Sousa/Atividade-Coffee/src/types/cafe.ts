import type { avaliacao } from "@/types/avaliacao"
export type form = string | null
export type notaTipos = string | number

export interface cafe {
  nome: form
  produtor: form
  caracteristicas: string
  origem: form
  processo: form
  ponto_de_torra: form
  nota: notaTipos
  aroma: number
  sabor: number
  acidez: number
  corpo: number
  finalização: number
  avaliacoes: avaliacao[]
}
