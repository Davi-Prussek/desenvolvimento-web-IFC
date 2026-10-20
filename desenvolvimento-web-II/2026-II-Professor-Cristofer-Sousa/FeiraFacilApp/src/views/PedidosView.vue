<script setup>
import { pedidos } from '@/data/pedidos'
import { ref,computed } from 'vue';
const totalPedidos = ref(pedidos.value.length)
const pedidosTotais = pedidos.value.map(pedido => pedido.itens)
const precoTotal = ref(0);
const itensTotal = ref(0);
const itens = pedidosTotais.map(item => item)
console.log(itens)
for (let itemA of itens) {
  for (let itemB of itemA) {
    precoTotal.value += (itemB.precoUnitario * itemB.quantidade)
    itensTotal.value += itemB.quantidade
  }
}
function sumQuantidade(array) {
  const valorTotal = ref(0);
  for (let item of array) {
    valorTotal.value+=item.quantidade
  }
  return valorTotal
}
function sumValor(array) {
  const valorTotal = ref(0);
  for (let item of array) {
    valorTotal.value+=(item.precoUnitario*item.quantidade)
  }
  return valorTotal
}
const filtro = ref('')

const valoresFiltrados = computed(() => {
  if (filtro.value == '') {
    return pedidos;
  } else {

  }
})
</script>

<template>
  <main class="container page">
    <header class="page-header">
      <h1>Resumo dos pedidos</h1>
      <p>
        Consulte os pedidos finalizados e o total vendido.
      </p>
    </header>

    <section class="summary-grid" aria-label="Resumo geral das vendas">
      <article class="summary-card">
        <span>Pedidos realizados</span>

        <!-- O aluno deverá calcular este valor. -->
        <strong>{{ totalPedidos }}</strong>
      </article>

      <article class="summary-card">
        <span>Itens vendidos</span>

        <!-- O aluno deverá calcular este valor. -->
        <strong>{{ itensTotal }}</strong>
      </article>

      <article class="summary-card">
        <span>Total vendido</span>

        <!-- O aluno deverá calcular este valor. -->
        <strong>R$ {{ precoTotal.toFixed(2) }}</strong>
      </article>
    </section>

    <section class="card" aria-labelledby="filtro-pedidos">
      <h2 id="filtro-pedidos">Filtrar pedidos</h2>

      <div class="filter-container">
        <div class="form-group">
          <label for="filtro">
            Nome do cliente ou código do pedido
          </label>

          <input id="filtro" name="filtro" type="search" v-model="filtro" placeholder="Digite o cliente ou código" />
        </div>

        <button class="button button-primary" type="button">
          Filtrar
        </button>
      </div>
    </section>

    <section class="card" aria-labelledby="pedidos-realizados">
      <h2 id="pedidos-realizados">Pedidos realizados</h2>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Cliente</th>
              <th scope="col">Produtos</th>
              <th scope="col">Itens</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody v-if="pedidos.length > 0">
            <tr v-for="(pedido, index) in pedidos" :key="index">
              <td>{{ pedido.codigo }}</td>
              <td>{{ pedido.cliente }}</td>
              <td>{{ pedido.itens.length }}</td>
              <td>{{sumQuantidade(pedido.itens)}}</td>
              <td>{{ sumValor(pedido.itens) }}</td>
            </tr>
          </tbody>
          <div v-else>
            <p>Sem pedidos registrados</p>
          </div>
        </table>
      </div>
    </section>
  </main>
</template>
