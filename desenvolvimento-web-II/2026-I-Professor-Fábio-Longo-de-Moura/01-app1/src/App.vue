<script setup>
import { ref, } from 'vue';

let contador = ref(0)

function manipular(event) {
if (event.target.id == 'adicao1') {
  contador.value++;
}
else if (event.target.id == 'adicao5') {
  contador.value+=5;
}

else if (event.target.id == 'subtracao1') {
    if (contador.value > 0) {
      contador.value--;
    }
  }
else if (event.target.id == 'subtracao5') {
    if (contador.value > 0) {
      contador.value-=5;
    }
  }
}


</script>

<template>
  <button  @click="manipular" id="adicao1">adicionar</button>
  <button  @click="manipular" id="subtracao1">diminuir</button>
  <button  @click="manipular" id="adicao5">adicionar 5</button>
  <button  @click="manipular" id="subtracao5">diminuir 5</button>
  <p>
    {{
      contador
    }}
  </p>
</template>

<style scoped></style>
