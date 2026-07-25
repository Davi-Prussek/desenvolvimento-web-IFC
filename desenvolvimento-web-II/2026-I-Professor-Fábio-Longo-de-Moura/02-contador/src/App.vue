<script setup>
import { computed, ref, watch } from 'vue'

const contador = ref(6)
const valor = ref(1)
const aviso = ref('')
const ligadoMais = ref(false)
const ligadoMenos = ref(false)

function aumentar() {
  if (valor.value < 0) {
    valor.value = 1;
  }
  if (contador.value < 10 && contador.value + valor.value <= 10) {
    contador.value += valor.value;
    aviso.value = '';
  } else if (contador.value + valor.value >= 10) {
    contador.value = 10;
  }
  else {
    ligadoMais.value = !ligadoMais.value;
  }
}
function diminuir() {
  if (valor.value < 0) {
    valor.value = 1;
  }
  if (contador.value > 0 && contador.value - valor.value >= 0) {
    contador.value -= valor.value
    aviso.value = '';
  } 
  else if (contador.value - valor.value <= 0) {
    contador.value = 0;
  }

  else {
    ligadoMenos.value = !ligadoMenos.value;
  }
}
const mensagem = computed(() => {
  if (contador.value === 10) return 'O contador está no máximo!'
  if (contador.value === 0) return 'O contador está no mínimo!'
  else return ''
})

</script>
<template>
<div class="principal">
  <p class="contador">Contador: {{ contador }}</p>
    <div class="information">
      <p class="legenda">Valor a incrementar/decrementar:</p>
        <input type="number" v-model="valor" min="1" max="10"></input>
    </div>
    <div class="buttons">
      <button @click="aumentar" :disabled="contador == 10">Incrementar</button>
      <button @click="diminuir" :disabled="contador == 0">decrementar</button>
    </div>
    <p 
  :style="{ visibility: mensagem ? 'visible' : 'hidden' }" class="aviso">{{ mensagem }}</p>
</div>
</template>
<style scoped>
.principal {
  text-align: center;
  .contador {
color: blue;
font-size: 3vw;
margin: 0;
padding: 0;
}
.information {
  display: flex;
  justify-content: center;
  gap: 1.1vw;
  .legenda {
  color: white;
  margin: 0;
  padding: 0;
  font-size: 1.05vw;
}
input {
  font-size: 1.05vw;
}
}
.buttons {
  margin-top: 1.5vw;
  display: flex;
  justify-content: space-between;
button {
  cursor: pointer;
  padding: 0.5vw 1vw;
  font-size: 1.3vw;
  border: none;
  color: white;
  background-color: rgb(0, 0, 223);
  box-shadow: 0 4px 0 rgb(0, 0, 158);
  transition: all 0.1s ease;
  border-radius: 12px;
}
button:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 rgb(0, 0, 158);
}

button:disabled {
background-color: rgb(225, 225, 255);
}
}
.aviso {
  font-size: 1.2vw;
  height: 2vw;
  color: white;
  background-color: red;
  padding: 0.2vw;
}
}
@media (max-width: 700px) {
.principal {

  text-align: center;
  .contador {
font-size: 14vw;
margin: 0;
padding: 0;
padding-inline: 6vw;
}
.information {
  display: flex;
  justify-content: center;
  gap: 1vw;
  .legenda {
  margin: 0;
  padding: 0;
  font-size: 5vw;
}
input {
  font-size: 5vw;
}
}
.buttons {
  margin-top: 1.5vw;
  display: flex;
  justify-content: space-between;
button {
  cursor: pointer;
  padding: 2vw 3vw;
  font-size: 6vw;
  border: none;
  transition: all 0.1s ease;
  border-radius: 10px;
}
}
.aviso {
  font-size: 5vw;
  height: 7vw;
  padding: 0.2vw;
}
}
}
</style>
