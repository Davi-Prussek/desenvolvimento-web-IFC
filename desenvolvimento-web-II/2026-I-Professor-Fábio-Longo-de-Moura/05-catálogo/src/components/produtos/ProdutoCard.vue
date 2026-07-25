<script setup>
  import { ref } from 'vue';
  const mostrarDialog = ref(false);
  defineProps(['id', 'nome', 'preco', 'imagem', 'categoria']);
  const emit = defineEmits(['atualizarpreco']);
  import ButtonChild from '../ButtonChild.vue';
  import ProdutoDialog from './ProdutoDialog.vue';
  import { formataPreco } from '@/utils/produtoUtils';
  function corrigirPreco(id, preco) {
    emit('atualizarpreco', id, preco);
    mostrarDialog.value = false;
  }
</script>

<template>
  <div class="produto-card">
    <div>
      <h2>{{ nome }}</h2>
      <p>Preço: {{ formataPreco(preco) }}</p>
    </div>
    <div>
      <img :src="imagem" class="produto-imagem" />
    </div>
    <ButtonChild @clique="mostrarDialog = true">Editar</ButtonChild>
    <ProdutoDialog v-if="mostrarDialog" :nome="nome" :id="id"
      :preco="preco" :categoria="categoria" @fechar="mostrarDialog = false" @corrigirpreco="corrigirPreco"/>
  </div>
</template>

<style scoped>
.produto-card {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  padding-right: 15px;
  padding-top: 15px;
  div {
    flex: 1;
  }
}
.bonitin {
  flex: 1;
  text-align: center;
  button {
  background-color: #4e4e4e;
  color: white;
  border: none;
  font-size: 17px;
  padding: 6px 10px;
  border-radius: 10px;
  &:hover {
    background-color: white;
    color: black;
  }
}
}
.produto-imagem {
  border-radius: 24px;
  max-width: 25%;
  max-height: 25%;
  object-fit: cover;
}
</style>
