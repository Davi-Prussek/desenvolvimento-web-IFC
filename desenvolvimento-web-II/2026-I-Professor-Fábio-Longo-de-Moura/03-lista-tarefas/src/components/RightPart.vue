<script setup>
defineProps({
  tarefasConcluidas: Array,
  tarefaEditada: Object
})

const emit = defineEmits([
  'limparConcluidas'
])
</script>

<template>
  <div class="direita">
    <h2 class="listaPrincipalAll">
      lista de tarefas concluídas:
      <button
        @click="emit('limparConcluidas')"
        class="limparConcluidas"
        :style="{ visibility: tarefasConcluidas.length == 0 ? 'hidden' : 'visible' }"
      >
        Limpar
      </button>
    </h2>

    <ul
      v-if="tarefasConcluidas.length != 0 && tarefaEditada == null"
      style="list-style: none;"
    >
      <li v-for="(tarefa, index) in tarefasConcluidas" :key="index">

        <div class="principalConcluida">
          <h4>{{ tarefa.nome }}</h4>

          <p>
            importância:
            <span
              :style="{
                backgroundColor:
                  tarefa.importancia == 'Baixa'
                    ? '#015201'
                    : tarefa.importancia == 'Média'
                    ? '#6d6d00'
                    : tarefa.importancia == 'Alta'
                    ? '#430000'
                    : '#434343',
                color:
                  tarefa.importancia == 'Baixa'
                    ? '#01bb01'
                    : tarefa.importancia == 'Média'
                    ? '#ffff2b'
                    : tarefa.importancia == 'Alta'
                    ? 'red'
                    : '#919191'
              }"
            >
              {{ tarefa.importancia }}
            </span>
          </p>
        </div>

        <p v-if="tarefa.desc.length !== 0">
          {{ tarefa.desc }}
        </p>
        <p v-else>Essa tarefa não tem descrição</p>

        <div class="datas">
          <p v-if="tarefa.dataInicio.length !== 0" class="dataInicio">
            {{ tarefa.dataInicio }}
          </p>
          <p v-else class="dataInicio">Sem data inicial</p>

          <p v-if="tarefa.dataFinal.length !== 0" class="dataFinal">
            {{ tarefa.dataFinal }}
          </p>
          <p v-else class="dataFinal">Sem data final</p>
        </div>

      </li>
    </ul>

    <p
      v-else-if="tarefasConcluidas.length == 0 && tarefaEditada == null"
      class="vazio"
    >
      Não há tarefas concluídas registradas no momento
    </p>

    <p v-else class="vazio">
      Saia do modo de edição caso deseje voltar (Esc).
    </p>
  </div>
</template>

<style scoped>
  .direita {
    position: relative;
    max-height: 100vh;
    overflow-y: hidden;
    padding-inline: 2vw;
    box-shadow: -5px 0px 10px 10px rgba(12, 12, 12, 0.187);
    border-left: 0.5px solid rgb(41, 41, 41);

    ul {
      padding-bottom: 10vw;
      margin-bottom: 5vw;
      max-height: 80vh;
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

    .vazio {
      font-size: 1.5vw;
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }

    h2.listaPrincipalAll {
      font-size: 2vw;
      text-align: center;
      padding: 2vw 0 2vw 0;

      button {
        border: none;
        background-color: #3b0000;
        color: white;
        font-size: 1.5vw;
        padding: 0.5vw 0.8vw;
        border-radius: 20px;
      }

      button:hover {
        background-color: #1f0000;
        cursor: pointer;
      }
    }

    li {
      border: 2px solid rgb(38, 38, 38);
      padding: 2vw 2vw;
      width: 85%;
      border-radius: 24px;
      position: relative;

      .principalConcluida {
        width: 100%;
        border-bottom: 1px solid white;
        padding-bottom: 1vw;
        margin-bottom: 1vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
          font-size: 2vw;
          word-wrap: break-word;

        }

        p {
          width: fit-content;

          span {
            border-radius: 12px;
            padding: 0.3vw 0.6vw;
          }
        }
      }

      p {
        text-align: left;
        padding: 0 0.5vw;
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

.listaPrincipalAll {
  font-size: 2vw;
  text-align: center;
  padding: 2vw 0;
}

.listaPrincipalAll button {
  border: none;
  background-color: #3b0000;
  color: white;
  font-size: 1.5vw;
  padding: 0.5vw 0.8vw;
  border-radius: 20px;
}

.listaPrincipalAll button:hover {
  background-color: #1f0000;
  cursor: pointer;
}

ul {
  padding-bottom: 10vw;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vw;
}

li {
  border: 2px solid rgb(38, 38, 38);
  padding: 2vw;
  width: 85%;
  border-radius: 24px;
}

.principalConcluida {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  padding-bottom: 1vw;
  margin-bottom: 1vw;
}

.vazio {
  font-size: 1.5vw;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
