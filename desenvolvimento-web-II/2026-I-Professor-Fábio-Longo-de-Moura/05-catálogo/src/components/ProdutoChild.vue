<script setup>
  defineProps(['id', 'nome', 'preco', 'categoria'])
  import ButtonChild from './ButtonChild.vue';
  import { formataPreco } from '@/utils/produtoUtils';
  defineEmits(['corrigirpreco'])
</script>

<template>
  <li>
    {{ nome }} - {{ formataPreco(preco) }} ({{ categoria }})
    <ButtonChild @clique="$emit('corrigirpreco', id)">
      Corrigir Preço
    </ButtonChild>
  </li>
</template>

<style scoped>

</style>
