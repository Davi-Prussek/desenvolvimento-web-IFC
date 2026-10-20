
<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:3000';

const tutores = ref([]);
const pets = ref([]);
const carregando = ref(true);
const erro = ref('');

async function carregarDados() {
  carregando.value = true;
  erro.value = '';

  try {
    const [resTutores, resPets] = await Promise.all([
      fetch(`${API_URL}/tutores`),
      fetch(`${API_URL}/pets`),
    ]);

    if (!resTutores.ok || !resPets.ok) {
      throw new Error('Não foi possível carregar os dados.');
    }

    tutores.value = await resTutores.json();
    pets.value = await resPets.json();
  } catch (e) {
    erro.value = e.message;
  } finally {
    carregando.value = false;
  }
}

function petsDoTutor(id) {
  return pets.value.filter(
    pet => String(pet.tutorId) === String(id)
  );
}

async function excluirTutor(tutor) {
  if (!window.confirm('Deseja realmente remover este tutor?')) {
    return;
  }

  if (petsDoTutor(tutor.id).length > 0) {
    alert('Este tutor possui pets vinculados. Remova ou transfira os pets antes de excluí-lo.');
    return;
  }

  try {
    const resposta = await fetch(
      `${API_URL}/tutores/${tutor.id}`,
      { method: 'DELETE' }
    );

    if (!resposta.ok) {
      throw new Error('Não foi possível excluir o tutor.');
    }

    await carregarDados();
  } catch (e) {
    erro.value = e.message;
  }
}

onMounted(carregarDados);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Tutores</h1>
      <p class="text-body-secondary">
        Tutores cadastrados e seus pets.
      </p>
    </header>

    <RouterLink
      class="btn btn-primary mb-3"
      to="/tutores/novo"
    >
      Adicionar Tutor
    </RouterLink>

    <p v-if="carregando">Carregando tutores...</p>
    <p v-else-if="erro" class="alert alert-danger">{{ erro }}</p>

    <table v-else class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Quantidade de pets</th>
          <th>Pets</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tutor in tutores" :key="tutor.id">
          <td>{{ tutor.id }}</td>
          <td>{{ tutor.nome }}</td>
          <td>{{ tutor.telefone }}</td>
          <td>{{ petsDoTutor(tutor.id).length }}</td>
          <td>
            <span v-if="petsDoTutor(tutor.id).length">
              {{ petsDoTutor(tutor.id).map(p => p.nome).join(', ') }}
            </span>
            <span v-else>Nenhum pet</span>
          </td>
          <td>
            <RouterLink
              :to="`/tutores/${tutor.id}`"
              class="btn btn-primary btn-sm me-2"
            >
              Visualizar
            </RouterLink>

            <button
              class="btn btn-danger btn-sm"
              @click="excluirTutor(tutor)"
            >
              Excluir
            </button>
          </td>
        </tr>

        <tr v-if="!tutores.length">
          <td colspan="6">Nenhum tutor cadastrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
