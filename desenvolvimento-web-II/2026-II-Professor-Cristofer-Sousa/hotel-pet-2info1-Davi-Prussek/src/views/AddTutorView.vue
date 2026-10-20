
<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const router = useRouter();

const tutor = ref({
  nome: '',
  telefone: '',
  email: '',
  documento: '',
});

const erro = ref('');
const salvando = ref(false);

const formularioValido = computed(() =>
  tutor.value.nome.trim() !== '' &&
  tutor.value.telefone.replace(/\D/g, '').length >= 10 &&
  (!tutor.value.email ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tutor.value.email))
);

function formatarTelefone(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  if (numeros.length <= 2) {
    return numeros.length ? `(${numeros}` : '';
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function formatarDocumento(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 14);

  if (numeros.length <= 11) {
    return numeros
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  }

  return numeros
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

async function salvarTutor() {
  erro.value = '';

  if (!formularioValido.value) {
    erro.value = 'Preencha corretamente os campos obrigatórios.';
    return;
  }

  salvando.value = true;

  try {
    const resposta = await fetch(`${API_URL}/tutores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: tutor.value.nome.trim(),
        telefone: tutor.value.telefone,
        ...(tutor.value.email && { email: tutor.value.email }),
        ...(tutor.value.documento && {
          documento: tutor.value.documento,
        }),
      }),
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível cadastrar o tutor.');
    }

    await router.push('/tutores');
  } catch (e) {
    erro.value = e.message;
  } finally {
    salvando.value = false;
  }
}
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastro de Tutor</h1>
    </header>

    <form @submit.prevent="salvarTutor">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome *</label>
        <input
          id="nome"
          v-model="tutor.nome"
          class="form-control"
          required
        />
        <small v-if="!tutor.nome.trim()" class="text-danger">
          Ops, campo obrigatório, por favor preencha-o!
        </small>
      </div>

      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone *</label>
        <input
          id="telefone"
          :value="tutor.telefone"
          @input="tutor.telefone = formatarTelefone($event.target.value)"
          class="form-control"
          type="tel"
          placeholder="(00) 00000-0000"
          required
        />
        <small
          v-if="tutor.telefone.replace(/\D/g, '').length < 10"
          class="text-danger"
        >
          Ops, campo obrigatório, por favor preencha-o!
        </small>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input
          id="email"
          v-model="tutor.email"
          class="form-control"
          type="email"
        />
      </div>

      <div class="mb-3">
        <label for="documento" class="form-label">CPF/CNPJ</label>
        <input
          id="documento"
          :value="tutor.documento"
          @input="tutor.documento = formatarDocumento($event.target.value)"
          class="form-control"
          placeholder="CPF ou CNPJ"
        />
      </div>

      <p v-if="erro" class="alert alert-danger">{{ erro }}</p>

      <button
        type="submit"
        class="btn btn-success me-2"
        :disabled="!formularioValido || salvando"
      >
        {{ salvando ? 'Salvando...' : 'Salvar Tutor' }}
      </button>

      <RouterLink to="/tutores" class="btn btn-secondary">
        Cancelar
      </RouterLink>
    </form>
  </div>
</template>
