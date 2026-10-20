
<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const API_URL = 'http://localhost:3000';
const route = useRoute();

const tutor = ref({});
const pets = ref([]);
const carregando = ref(true);
const erro = ref('');
const novoPet = ref({ nome: '', especie: '' });
const salvandoPet = ref(false);


async function carregarDados() {
  carregando.value = true;
  erro.value = '';

  try {
    const id = route.params.id;

    const [resTutor, resPets] = await Promise.all([
      fetch(`${API_URL}/tutores/${id}`),
      fetch(`${API_URL}/pets`),
    ]);

    if (!resTutor.ok || !resPets.ok) {
      throw new Error('Não foi possível carregar os dados.');
    }

    tutor.value = await resTutor.json();

    const todosPets = await resPets.json();

    pets.value = todosPets.filter(
      pet => String(pet.tutorId) === String(id)
    );
  } catch (e) {
    erro.value = e.message;
  } finally {
    carregando.value = false;
  }
}


async function salvarPet() {
  erro.value = '';

  if (!novoPet.value.nome.trim() || !novoPet.value.especie) {
    erro.value = 'Preencha o nome e a espécie do pet.';
    return;
  }

  salvandoPet.value = true;

  try {
    const resposta = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: novoPet.value.nome.trim(),
        especie: novoPet.value.especie,
        tutorId: tutor.value.id,
      }),
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível cadastrar o pet.');
    }

    novoPet.value = { nome: '', especie: '' };
    await carregarDados();
  } catch (e) {
    erro.value = e.message;
  } finally {
    salvandoPet.value = false;
  }
}

onMounted(carregarDados);
</script>

<template>
  <div>
    <p v-if="carregando">Carregando dados do tutor...</p>

    <template v-else>
      <header class="mb-4">
        <h1 class="text-2xl font-bold">Detalhes do Tutor</h1>
      </header>

      <p><strong>ID:</strong> {{ tutor.id }}</p>
      <p><strong>Nome:</strong> {{ tutor.nome }}</p>
      <p><strong>Telefone:</strong> {{ tutor.telefone }}</p>

      <hr />

      <h2 class="text-xl font-bold mb-3">Pets vinculados</h2>

      <p v-if="!pets.length">
        Nenhum pet vinculado a este tutor.
      </p>

      <table v-else class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pet in pets" :key="pet.id">
            <td>{{ pet.id }}</td>
            <td>{{ pet.nome }}</td>
            <td>{{ pet.especie }}</td>
            <td>
              <RouterLink
                :to="`/pets/${pet.id}`"
                class="btn btn-primary btn-sm"
              >
                Visualizar
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2 class="text-xl font-bold mb-3">Cadastrar Pet</h2>

      <form @submit.prevent="salvarPet">
        <div class="mb-3">
          <label for="nomePet" class="form-label">Nome do Pet *</label>
          <input
            id="nomePet"
            v-model="novoPet.nome"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="especiePet" class="form-label">Espécie *</label>
          <select
            id="especiePet"
            v-model="novoPet.especie"
            class="form-select"
            required
          >
            <option value="" disabled>Selecione a espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>

        <p v-if="erro" class="alert alert-danger">{{ erro }}</p>

        <button
          class="btn btn-success me-2"
          type="submit"
          :disabled="salvandoPet"
        >
          {{ salvandoPet ? 'Salvando...' : 'Cadastrar Pet' }}
        </button>

        <RouterLink to="/tutores" class="btn btn-secondary">
          Voltar
        </RouterLink>
      </form>
    </template>

    <p v-if="erro && carregando" class="alert alert-danger">
      {{ erro }}
    </p>
  </div>
</template>
