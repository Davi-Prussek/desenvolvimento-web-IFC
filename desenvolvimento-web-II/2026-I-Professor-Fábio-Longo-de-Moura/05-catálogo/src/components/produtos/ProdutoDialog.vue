<script setup>
import { ref } from 'vue'
const props = defineProps(['nome', 'id', 'preco', 'categoria']);
defineEmits(['corrigirpreco', 'fechar'])
import ButtonChild from '../ButtonChild.vue';
import { formataPreco } from '@/utils/produtoUtils';
const novopreco = ref(props.preco.toFixed(2))
</script>
<template>
  <div class="overlay">
    <div class="produto-dialog">
      <h2>Nome</h2>
      <p>Preço: {{ formataPreco(preco) }}</p>
      <p>Categoria: {{ categoria }}</p>
      <input type="number" v-model.number="novopreco">
      <ButtonChild @clique="$emit('corrigirpreco', id, novopreco )">Corrigir Preço</ButtonChild>
      <ButtonChild @clique="$emit('fechar')">Cancelar</ButtonChild>
    </div>
  </div>
</template>
<style scoped>
.produto-dialog {
  border: 1px solid #ccc;
  padding: 16px;
  margin-top: 16px;
  background-color: rgb(0,0,0);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

}
</style>
