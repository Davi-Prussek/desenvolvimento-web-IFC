<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tarefaEditada: Object,
  filtro: String
})

const emit = defineEmits(['salvar', 'update:filtro'])

const nome = ref("")
const desc = ref("")
const dataInicio = ref('')
const dataFinal = ref('')
const importancia = ref('')
const dica = ref(false)

watch(() => props.tarefaEditada, (tarefa) => {
  if (tarefa) {
    nome.value = tarefa.nome
    desc.value = tarefa.desc
    dataInicio.value = tarefa.dataInicio
    dataFinal.value = tarefa.dataFinal
    importancia.value = tarefa.importancia
  } else {
    nome.value = ''
    desc.value = ''
    dataInicio.value = ''
    dataFinal.value = ''
    importancia.value = ''
  }
})

function salvar() {
  emit('salvar', {
    nome: nome.value,
    desc: desc.value,
    dataInicio: dataInicio.value,
    dataFinal: dataFinal.value,
    importancia: importancia.value
  })

  nome.value = ''
  desc.value = ''
  dataInicio.value = ''
  dataFinal.value = ''
  importancia.value = ''
}

function atualizarFiltro(e) {
  emit('update:filtro', e.target.value)
}

function abrirDica() {
  dica.value = !dica.value
  setTimeout(() => {
    dica.value = false
  }, 5000)
}
</script>
<template>
  <div class="esquerda">
    <h2 v-if="tarefaEditada == null">Criar tarefa</h2>
    <h2 v-else>Editar tarefa</h2>

    <div class="form" @keypress.enter.prevent="salvar">
      <div>
        <label for="nome">Nome da tarefa:</label>
        <input id="nome" type="text" v-model="nome" placeholder="Nome da tarefa">
      </div>

      <div>
        <label for="importância">Prioridade: </label>
        <select v-model="importancia" id="importância" name="importância">
          <option disabled value="">importância</option>
          <option value="Baixa">não importante</option>
          <option value="Média">pouco importante</option>
          <option value="Alta">muito importante</option>
        </select>
      </div>

      <label for="desc">Descrição da tarefa:</label>
      <textarea id="desc" v-model="desc" placeholder="Descrição da tarefa"></textarea>

      <div class="dateForm">
        <label for="data_inicio">Data de início:</label>
        <input id="data_inicio" type="datetime-local" v-model="dataInicio">

        <label for="Data_final">Data final:</label>
        <input id="Data_final" type="datetime-local" v-model="dataFinal">
      </div>

      <button @click="salvar">Registrar tarefa</button>
    </div>

    <div class="filtro" v-if="!tarefaEditada">
      <label for="filtro">Filtrar tarefas:</label>
      <div>
        <input
          id="filtro"
          type="text"
          :value="filtro"
          @input="atualizarFiltro"
          placeholder="Filtrar"
        >

        <button @click="abrirDica">
          <font-awesome-icon :icon="faQuestion" />
        </button>

        <p class="detail" v-if="dica">
          Você pode esvaziar o filtro clicando Esc
        </p>
      </div>
    </div>

    <div class="vazioFiltro" v-else>
      <p>Saia do modo de edição caso deseje filtrar suas tarefas (Esc).</p>
    </div>
  </div>
</template>
<style scoped>
.esquerda {
  position: relative;
  box-shadow: 5px 0px 10px 10px rgba(12, 12, 12, 0.187);
  border-right: 0.5px solid rgb(41, 41, 41);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.esquerda h2 {
  font-size: 2vw;
  margin: 2vw;
  margin-bottom: 1vw;
}

.esquerda .form {
  margin-bottom: 1vw;
  text-align: left;
  width: max-content;
  border-radius: 24px;
  padding: 2vw 2vw;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
  border: 1px solid rgb(41, 41, 41);
  background-color: rgb(23, 23, 23);
  color: white;
  position: relative;
  margin-inline: 2vw;
}

.esquerda .form label {
  font-size: 1.5vw;
}

.esquerda .form input,
.esquerda .form select,
.esquerda .form textarea {
  border: none;
  border-radius: 12px;
  padding: 0.4vw 0.5vw;
  font-size: 1vw;
  background-color: rgb(37, 37, 37);
  color: white;
}

.esquerda .form textarea {
  resize: none;
  height: 8vh;
}

.esquerda .form .dateForm {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.esquerda .form button {
  background-color: rgb(0, 71, 13);
  border: none;
  color: white;
  font-size: 1.1vw;
  padding: 0.5vw 0.8vw;
  border-radius: 14px;
}

.esquerda .form button:hover {
  background-color: rgb(0, 41, 7);
  cursor: pointer;
}

/* FILTRO */
.esquerda .filtro {
  display: flex;
  text-align: left;
  margin-inline: 2vw;
  border-radius: 24px;
  padding: 1.5vw 2vw;
  gap: 1vw;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  border: 1px solid rgb(41, 41, 41);
  background-color: rgb(23, 23, 23);
  color: white;
  position: relative;
}

.esquerda .filtro label {
  font-size: 1.5vw;
}

.esquerda .filtro div {
  display: flex;
  gap: 1vw;
  align-items: center;
}

.esquerda .filtro input {
  border: none;
  border-radius: 12px;
  padding: 0.5vw 0.6vw;
  font-size: 1vw;
  background-color: rgb(37, 37, 37);
  color: white;
}

.esquerda .filtro button {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 50%;
  height: 2vw;
  width: 2vw;
}

.esquerda .filtro .detail {
  background-color: black;
  position: absolute;
  top: -10vh;
  right: -15vh;
  padding: 0.7vw;
  border-radius: 12px;
}

.esquerda .vazioFiltro {
  font-size: 1.3vw;
  padding-inline: 2vw;
  margin-top: 2vw;
}
</style>
