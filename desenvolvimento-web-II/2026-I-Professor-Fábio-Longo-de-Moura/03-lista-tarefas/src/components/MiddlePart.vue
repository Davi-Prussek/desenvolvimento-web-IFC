<script setup>
import { faTrash, faPencil, faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons'

defineProps({
  tarefas: Array,
  tarefasFiltradas: Array,
  tarefasApagadas: Array,
  tarefaEditada: Object,
  menu: [Object, Boolean]
})

const emit = defineEmits([
  'toggleMenu',
  'editar',
  'excluir',
  'concluir',
  'esvaziar',
  'recuperar'
])
</script>

<template>
  <div class="meio">
    <div class="lista-principal">
      <h2>
        lista de tarefas:
        <div>
          <button
            @click="emit('esvaziar')"
            v-if="tarefas.length != 0"
            class="limparPrincipal"
          >
            Esvaziar
          </button>

          <button
            v-if="tarefasApagadas.length != 0"
            class="RetornarPrincipal"
            @click="emit('recuperar')"
          >
            Recuperar
          </button>
        </div>
      </h2>

      <ul v-if="tarefas.length != 0 && !tarefaEditada">
        <li v-for="(tarefa, index) in tarefasFiltradas" :key="index">

          <button
            @click="emit('toggleMenu', tarefa)"
            class="more"
          >
            <font-awesome-icon :icon="faEllipsis" />
          </button>

          <div class="menu" v-if="menu == tarefa">
            <button @click="emit('editar', tarefa)">
              <font-awesome-icon :icon="faPencil" />Editar
            </button>

            <button @click="emit('excluir', tarefa)" class="excluir">
              <font-awesome-icon :icon="faTrash" />Excluir
            </button>
          </div>

          <div class="principal">
            <h3>{{ tarefa.nome }}</h3>

            <div>
              <p class="importancia">
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
          </div>

          <p class="desc" v-if="tarefa.desc.length != 0">
            {{ tarefa.desc }}
          </p>

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

          <div>
            <button
              class="pronto"
              @click="emit('concluir', tarefa)"
            >
              <font-awesome-icon :icon="faCheck" />
              Concluir Tarefa
            </button>
          </div>
        </li>
      </ul>

      <p
        v-else-if="tarefas.length == 0 && !tarefaEditada"
        class="vazio"
      >
        Não há tarefas registradas no momento
      </p>

      <p v-else class="vazio">
        Saia do modo de edição caso deseje voltar (Esc).
      </p>
    </div>
  </div>
</template>

<style scoped>
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

.lista-principal .vazio {
  font-size: 1.5vw;
  padding-top: 20vw;
}

.lista-principal h2 div {
  display: flex;
  justify-content: center;
  gap: 2vw;
  padding-top: 1vw;
}

.limparPrincipal,
.RetornarPrincipal {
  border: none;
  background-color: #3b0000;
  color: white;
  font-size: 1.3vw;
  padding: 0.5vw 0.8vw;
  border-radius: 20px;
}

.limparPrincipal:hover,
.RetornarPrincipal:hover {
  background-color: #1f0000;
  cursor: pointer;
}

.lista-principal ul {
  padding-bottom: 15vw;
  max-height: 75vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vw;
}

li {
  border: 2px solid rgb(38, 38, 38);
  padding: 2vw;
  width: 90%;
  border-radius: 24px;
  position: relative;
}

.more {
  position: absolute;
  top: 1vw;
  right: 1.5vw;
  background: transparent;
  border: none;
}

.menu {
  position: absolute;
  right: 1.5vw;
  top: 3.5vw;
  background: #242424;
  border-radius: 24px;
  padding: 0.6vw;
}

.principal {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
}

.desc {
  text-align: left;
  color: rgb(154, 154, 154);
}

.datas {
  display: flex;
  justify-content: space-between;
}

.pronto {
  background-color: rgb(0, 71, 13);
  border: none;
  color: white;
  border-radius: 14px;
}
</style>
