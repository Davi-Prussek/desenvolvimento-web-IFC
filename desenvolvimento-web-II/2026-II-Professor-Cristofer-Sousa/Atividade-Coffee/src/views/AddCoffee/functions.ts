import type { Ref } from "vue"
import type { cafe } from "@/types/cafe";
import type { form } from "@/types/cafe"

export function AddCoffee(
  acervo: cafe[],nome: form,produtor: form,
  origem: form,processo: form,pontoDeTorra: form
  ) {
  if (nome !== '' && nome !== null){
    acervo.push({nome: nome,produtor: produtor,origem: origem,processo: processo,caracteristicas: '',
    ponto_de_torra: pontoDeTorra,nota: 0,aroma: 0,sabor: 0,acidez: 0,corpo: 0,finalização: 0,avaliacoes: []
    });
    nome = null; produtor = null; origem = null; processo = null; pontoDeTorra = null}
    }

export function LimparForm(
  nome: Ref<form>,produtor: Ref<form>,origem: Ref<form>,processo: Ref<form>,pontoDeTorra: Ref<form>
) {
  nome.value = null; produtor.value = null; origem.value = null; processo.value = null; pontoDeTorra.value = null
  }

export function letraMaiscPrep (title: string): string {
    const lowerWords = new Set([
      'contra','de', 'da', 'das', 'do','dos','desde', 'em',
      'sobre','trás', 'entre', 'no', 'na', 'sem', 'sob',
      'a', 'as', 'o', 'os','ante', 'após', 'até','com',
      'nos', 'nas', 'e', 'ou', 'para','perante','por',
    ])
  return title.toLowerCase().split(' ').map((word, index) => {
        if (!word) return word;
        return index === 0 || !lowerWords.has(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word
      }).join(' ')
}
