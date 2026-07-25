import { listaProdutos } from '@/data/produtos'
import { moedaPais } from './global'
import { idioma } from './global'

function formataPreco(valor) {
  return Number(valor).toLocaleString(idioma, {
    style: 'currency',
    currency: moedaPais,
  })
}
export { formataPreco }

function atualizaPreco(id, novoPreco) {
  const index = listaProdutos.value.findIndex(e => e.id == id);
  listaProdutos.value[index].preco = novoPreco;
  return;
}
export {atualizaPreco};
