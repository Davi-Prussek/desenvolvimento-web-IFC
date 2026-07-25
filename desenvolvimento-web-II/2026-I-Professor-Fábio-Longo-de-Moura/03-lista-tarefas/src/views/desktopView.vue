<script setup>
import LeftPart from '@/components/LeftPart.vue'
import MiddlePart from '@/components/MiddlePart.vue'
import RightPart from '@/components/RightPart.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue';
const menu = ref(true);
const add_section = ref(false);
const completa_section = ref(false);
const delete_section = ref(false);
const deleteAll_section = ref(false);
const delCom_section = ref(false);
const apagadasVazio_section = ref(false);
const filtro = ref('');
class tarefa {
  constructor(nome, desc, dataInicio, dataFinal, status, importancia) {
    this.nome = LMP(nome.trim());
    this.desc = desc || 'Sem descrição';
    this.dataInicio = dataInicio;
    this.dataFinal = dataFinal;
    this.status = 'incompleta';
    this.importancia = importancia || 'padrão';
  }
}
const tarefas = ref([]);
const tarefasConcluidas = ref([]);
const tarefasApagadas = ref([]);
const aviso = ref("");
const tempo = 2600;
const tarefaConcluida = ref(null);
const tarefaEditada = ref(null);

function abrirConfig(tarefa) {
  if (menu.value === tarefa) {
    menu.value = null
  } else {
    menu.value = tarefa
  }
}
function LMP(nome) {
  return nome.charAt(0).toUpperCase() + nome.toLowerCase().substring(1)
}
function validarNome(nome) {
  if (nome.length !== 0) {
    if (nome.length <= 40) {
      if (!/[a-zA-Z]/.test(nome)) {
        aviso.value = 'O nome da tarefa deve ter apenas letras'
        setTimeout(() => {
          aviso.value = '';
        }, tempo);
        return false;
      }
      else {
        return true;
      }
    } else {
      aviso.value = 'O nome da tarefa deve ter até 40 caracteres'
      setTimeout(() => {
        aviso.value = '';
      }, tempo);
      return false;
    }
  }
  else if (nome.length == 0) {
    aviso.value = 'O nome da tarefa não pode ficar em branco'
    setTimeout(() => {
      aviso.value = '';
    }, tempo);
    return false;
  }
}
function validarDesc(desc) {
  if (desc.length > 500) {
    aviso.value = 'A descrição da tarefa deve ter até 500 carácteres'
    setTimeout(() => {
      aviso.value = '';
    }, tempo);
    return false;
  } else if (desc.length <= 500) {
    return true;
  }
}
function validarDatas(dataInicio, dataFinal) {
  if (dataInicio.length !== 0 && dataFinal.length !== 0) {
    if (Date.parse(dataInicio) >= Date.parse(dataFinal)) {
      aviso.value = 'A data limite da tarefa deve ser além da data inicial'
      setTimeout(() => {
        aviso.value = '';
      }, tempo);
      return false;
    }
    else if (Date.parse(dataInicio) < Date.parse(dataFinal)) {
      return true;
    }
  }
  else if (dataInicio.length !== 0 || dataFinal.length !== 0) {
    return true;
  }
  else if (dataInicio.length == 0 && dataFinal.length == 0) {
    return true;
  }
}
function registrar(dados) {
  const { nome, desc, dataInicio, dataFinal, importancia } = dados;

  if (
    validarNome(nome) &&
    validarDesc(desc) &&
    validarDatas(dataInicio, dataFinal)
  ) {
    tarefas.value.unshift(
      new tarefa(nome, desc, dataInicio, dataFinal, 'incompleta', importancia)
    );
  }
}
function concluirTarefa(tarefa) {
  tarefasConcluidas.value.unshift(tarefa);
  completa_section.value = !completa_section.value;
  tarefaConcluida.value = tarefa;
  tarefas.value.splice(tarefas.value.indexOf(tarefa), 1);
  setTimeout(() => {
    completa_section.value = !completa_section.value;
  }, 1500);
}
function excluirTarefa(tarefa) {
  tarefaConcluida.value = tarefa;
  delete_section.value = !delete_section.value;
}
function recuperar() {
  if (tarefasApagadas.value.length > 0) {
    tarefas.value.push(tarefasApagadas.value.pop());
  } else {
    apagadasVazio_section.value = !apagadasVazio_section.value;
    setTimeout(() => {
      apagadasVazio_section.value = !apagadasVazio_section.value;;
    }, tempo);
  }
}
function esvaziar() {
  while (tarefas.value.length > 0) {
    tarefasApagadas.value.unshift(tarefas.value.shift());
  }
}
function confirmDelete() {
  tarefas.value.splice(tarefas.value.indexOf(tarefaConcluida.value), 1);
  tarefasApagadas.value.unshift(tarefaConcluida.value);
  delete_section.value = !delete_section.value;
}
function pegarValoresTarefa() {
  return {
    nome: tarefaConcluida.value.nome,
    desc: tarefaConcluida.value.desc,
    dataInicio: tarefaConcluida.value.dataInicio,
    dataFinal: tarefaConcluida.value.dataFinal,
    importancia: tarefaConcluida.value.importancia
  }
}
function editarTarefa(tarefa) {
  tarefaEditada.value = tarefa;
  add_section.value = !add_section.value;
}
function handleClickOutside(event) {
  const clicouNoBotao = event.target.closest('.more')
  const clicouNoMenu = event.target.closest('.menu')

  if (!clicouNoBotao && !clicouNoMenu) {
    menu.value = null
  }
}
function handleClickOutsideDelete(event) {
  const clicouNoBotao = event.target.closest('.excluir')
  const clicouNoDelete = event.target.closest('.limparPrincipal')

  if (!clicouNoBotao && !clicouNoDelete) {
    delete_section.value = false;
  }
}
function handleClickOutsideDeleteAll(event) {
  const clicouNoBotao = event.target.closest('.limparPrincipal')
  const clicouNoDeleteAll = event.target.closest('.deleteAll')

  if (!clicouNoBotao && !clicouNoDeleteAll) {
    deleteAll_section.value = false;
  }
}
function handleClickOutsideDeleteAllComplete(event) {
  const clicouNoBotao = event.target.closest('.limparConcluidas')
  const clicouNoDeleteAll = event.target.closest('.deleteAllComplete')

  if (!clicouNoBotao && !clicouNoDeleteAll) {
    delCom_section.value = false;
  }
}
function escBonitinho(event) {
  if (event.key === 'Escape' && tarefaEditada.value != null) {
    tarefaEditada.value = null;
  }
}

const tarefasFiltradas = computed(() => {
  if (filtro.value == '') {return tarefas.value};

  return tarefas.value.filter(tarefa => tarefa.nome.toLowerCase().includes(filtro.value.toLowerCase()) || tarefa.desc.toLowerCase().includes(filtro.value.toLowerCase()))
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('click', handleClickOutsideDelete)
  document.addEventListener('click', handleClickOutsideDeleteAll)
  document.addEventListener('click', handleClickOutsideDeleteAllComplete)
  document.addEventListener('keydown', escBonitinho)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleClickOutsideDelete)
  document.removeEventListener('click', handleClickOutsideDeleteAll)
  document.removeEventListener('click', handleClickOutsideDeleteAllComplete)
  document.removeEventListener('keydown', escBonitinho)
})
</script>
<template>
  <main style="display: flex; justify-content: space-around;">
<LeftPart
  :tarefaEditada="tarefaEditada"
  :filtro="filtro" @salvar="registrar" @update:filtro="filtro = $event"/>
    <div class="deleteAllComplete" v-if="delCom_section">
      <p>Deseja mesmo limpar todas as tarefas concluídas?</p>
      <div>
        <button @click="tarefasConcluidas = []; delCom_section = !delCom_section" class="simComplete">Sim</button>
        <button @click="delCom_section = !delCom_section" class="naoComplete">Não</button>
      </div>
    </div>

    <div class="deleteAll" v-if="deleteAll_section">
      <p>Deseja mesmo limpar todas as tarefas registradas?</p>
      <div>
        <button @click="esvaziar(); deleteAll_section = !deleteAll_section" class="sim">Sim</button>
        <button @click="deleteAll_section = !deleteAll_section" class="nao">Não</button>
      </div>
    </div>

    <div class="delete" v-if="delete_section">
      <h2>Certeza que deseja apagar a seguinte tarefa?</h2>
      <div>
        <h3>{{ tarefaConcluida.nome }} </h3>
        <p>{{ tarefaConcluida.desc }}</p>
      </div>
      <div style="display: flex; justify-content: center; gap: 2vw;">
        <button @click="confirmDelete()" class="confirm">Sim</button>
        <button @click="delete_section = false" class="desconfirm">Não</button>
      </div>
    </div>
    <div class="complete" v-if="completa_section">
      <h2>Tarefa concluída: {{ pegarValoresTarefa().nome }}</h2>
      <p> {{ pegarValoresTarefa().desc }}</p>
    </div>
<MiddlePart :tarefas="tarefas" :tarefasFiltradas="tarefasFiltradas" :tarefasApagadas="tarefasApagadas" :tarefaEditada="tarefaEditada" :menu="menu" @toggleMenu="abrirConfig" @editar="editarTarefa" @excluir="excluirTarefa" @concluir="concluirTarefa" @esvaziar="deleteAll_section = true" @recuperar="recuperar"/>

<RightPart :tarefasConcluidas="tarefasConcluidas" :tarefaEditada="tarefaEditada" @limparConcluidas="delCom_section = true"/>
    <div class="aviso" v-if="aviso">
      <h2>ERRO NO PREENCHIMENTO DO FORMULÁRIO DA TAREFA: </h2>
      <p> {{ aviso }}</p>
    </div>
    <div class="apagadasVazio_section" v-if="apagadasVazio_section">
      <h2>Nenhuma tarefa foi apagada!</h2>
    </div>
  </main>
</template>
<style scoped>
body,
html,
main {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  color: white;

  .esquerda,
  .meio,
  .direita {
    flex: 1;
  }

  .aviso {
    text-align: center;
    width: 70vh;
    font-size: 1.3vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
    padding: 2vw 2vw;
    border-radius: 24px;
    background-color: rgb(18, 18, 18);
    z-index: 10;

    h2 {
      padding-bottom: 1vw;
      margin-bottom: 1vw;
      border-bottom: 0.5px solid white;
    }

    p {
      font-size: 1.2vw;
    }
  }
.apagadasVazio_section {
    text-align: center;
    width: 70vh;
    font-size: 1.3vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
    padding: 2vw 2vw;
    border-radius: 24px;
    background-color: rgb(18, 18, 18);
    z-index: 10;

    h2 {
      padding-bottom: 1vw;
      margin-bottom: 1vw;
      border-bottom: 0.5px solid white;
    }
}
  .meio {
    max-height: 100vh;
    overflow-y: hidden;
    padding-inline: 2vw;
    text-align: center;

    .lista-principal {
      .vazio {
        font-size: 1.5vw;
        padding-top: 20vw;
      }

      h2 {
        div {
          display: flex;
          justify-content: center;
          gap: 2vw;
          padding-top: 1vw;

          .limparPrincipal {
            border: none;
            background-color: #3b0000;
            color: white;
            font-size: 1.3vw;
            padding: 0.5vw 0.8vw;
            border-radius: 20px;
          }

          .limparPrincipal:hover {
            background-color: #1f0000;
            cursor: pointer;
          }

          .RetornarPrincipal {
            border: none;
            background-color: #3b0000;
            color: white;
            font-size: 1.3vw;
            padding: 0.5vw 0.8vw;
            border-radius: 20px;
          }

          .RetornarPrincipal:hover {
            background-color: #1f0000;
            cursor: pointer;
          }
        }
      }

      ul {
        padding-bottom: 15vw;
        margin-bottom: 15vw;
        max-height: 75vh;
        overflow-y: auto;
        scrollbar-width: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3vw;

        div {
          margin-top: 1vw;
          display: flex;
          gap: 2vw;

          .pronto {
            background-color: rgb(0, 71, 13);
            border: none;
            color: white;
            font-size: 1.1vw;
            padding: 0.5vw 0.8vw;
            border-radius: 14px;
            display: flex;
            justify-content: center;
            transition: 0.1s ease all;
            align-items: center;
          }

          .pronto:hover {
            cursor: pointer;
            background-color: rgb(0, 41, 7);
          }
        }
      }

      li {
        border: 2px solid rgb(38, 38, 38);
        padding: 2vw 2vw;
        padding-top: 4vw;
        width: 90%;
        border-radius: 24px;
        position: relative;

        h3 {
          font-size: 2vw;
          word-wrap: break-word;
        }

        .more {
          position: absolute;
          border: none;
          font-size: 1.5vw;
          padding: 0.5vw;
          background-color: transparent;
          color: white;
          top: 1vw;
          right: 1.5vw;
          transition: 0.2s ease all;
          border-radius: 15px;
        }

        .more:hover {
          cursor: pointer;
          background-color: rgb(41, 41, 41);
        }

        .menu {
          background-color: rgb(36, 36, 36);
          padding: 0.6vw 0.5vw;
          display: flex;
          gap: 1vw;
          border-radius: 24px;
          flex-direction: column;
          width: 8vw;
          position: absolute;
          right: 1.5vw;
          top: 3.5vw;
          box-shadow: 0px 0px 15px 15px rgba(0, 0, 0, 0.215);

          button {
            padding: 0.8vw;
            border-radius: 18px;
            font-size: 1.1vw;
            color: white;
            background-color: transparent;
            border: none;
            transition: 0.1s ease all;
          }

          button:hover {
            cursor: pointer;
            background-color: rgb(87, 87, 87);
          }
        }

        .principal {
          display: flex;
          gap: 2vw;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1vw;
          margin-bottom: 1vw;
          border-bottom: 1px solid white;

          p {
            font-size: 1.1vw;

            span {
              border-radius: 12px;
              padding: 0.3vw 0.6vw;
            }
          }

          div {
            display: flex;
            align-items: center;

            div {
              border-radius: 50%;
              height: 1.5vw;
              width: 1.5vw;
            }
          }
        }

        .desc {
          text-align: left;
          padding: 0.8vw 0.5vw;
          width: 100%;
          color: rgb(154, 154, 154);
          font-size: 1.2vw;
        }

        .datas {
          display: flex;
          justify-content: space-between;
          border-top: 0.5px solid white;
          padding-top: 1vw;
          margin-top: 1vw;
          margin-bottom: 2vw;
          font-size: 1.3vw;

          .dataInicio {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }

          .dataFinal {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }
        }
      }
    }

    h2 {
      font-size: 2vw;
      margin: 2vw;
    }
  }
}

.complete {
  width: 70vh;
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 2vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;

  h2 {
    padding-bottom: 1vw;
    margin-bottom: 1vw;
    font-size: 1.6vw;
    border-bottom: 1px solid white;
  }

  p {
    color: rgb(154, 154, 154);
    line-height: 1.7vw;
    padding-left: 0.5vw;
  }
}

.delete {
  width: 70vh;
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 2vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;

  h2 {
    font-size: 2vw;
  }

  div {
    margin-top: 2vw;
    width: 100%;
    justify-content: center;
    gap: 3vw;

    h3 {
      padding-bottom: 1vw;
      margin-bottom: 1vw;
      font-size: 1.6vw;
      border-bottom: 1px solid white;
    }

    p {
      color: rgb(154, 154, 154);
      padding-left: 0.5vw;
    }

    button {
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.3vw;
      padding: 0.5vw 1vw;
      border-radius: 12px;
      transition: all 0.1s ease;
    }

    .desconfirm {
      background-color: rgb(0, 107, 0);
    }

    .confirm {
      background-color: rgb(152, 0, 0);
    }

    .desconfirm:hover {
      cursor: pointer;
      background-color: rgb(0, 70, 0);
    }

    .confirm:hover {
      cursor: pointer;
      background-color: rgb(70, 0, 0);
    }
  }
}

.deleteAll {
  text-align: center;
  width: 70vh;
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 2vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;

  div {
    margin-top: 2vw;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 3vw;

    button {
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.3vw;
      padding: 0.5vw 1vw;
      border-radius: 12px;
    }

    .nao {
      background-color: rgb(0, 107, 0);
    }

    .sim {
      background-color: rgb(152, 0, 0);
    }

    .nao:hover {
      cursor: pointer;
      background-color: rgb(0, 70, 0);
    }

    .sim:hover {
      cursor: pointer;
      background-color: rgb(70, 0, 0);
    }
  }
}

.deleteAllComplete {
  text-align: center;
  width: 70vh;
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 2vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;

  div {
    margin-top: 2vw;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 3vw;

    button {
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.3vw;
      padding: 0.5vw 1vw;
      border-radius: 12px;
    }

    .naoComplete {
      background-color: rgb(0, 107, 0);
    }

    .simComplete {
      background-color: rgb(152, 0, 0);
    }

    .naoComplete:hover {
      cursor: pointer;
      background-color: rgb(0, 70, 0);
    }

    .simComplete:hover {
      cursor: pointer;
      background-color: rgb(70, 0, 0);
    }
  }
}
</style>
