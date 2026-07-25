<script setup>
  import { ref } from 'vue'
  import { listaProdutos } from '@/data/produtos';
    import ProdutoCard from '@/components/produtos/ProdutoCard.vue';
  const produtos = ref(listaProdutos);
  produtos.value = produtos.value.filter(p =>
    p.categoria === 'Brinquedos');
    function atualizarpreco(id, novopreco) {
     const posicao = produtos.value.findIndex(p => p.id === id);
     produtos.value[posicao].preco = novopreco;
    }
</script>

<template>
  <div class="container">
    <h1>Brinquedos</h1>
    <div class="produtos">
      <ProdutoCard v-for="produto in produtos" :key="produto.id"
        class="produto-card"
         :id="produto.id"
         :nome="produto.nome"
         :preco="produto.preco"
         :imagem="produto.imagem"
         :categoria="produto.categoria"
          @atualizarpreco="atualizarpreco"
         >
      </ProdutoCard>
    </div>
  </div>
</template>

<style scoped>
</style>
