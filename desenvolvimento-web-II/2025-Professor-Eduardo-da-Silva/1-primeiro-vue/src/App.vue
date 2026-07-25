<!-- <script setup>
import { ref, onMounted } from 'vue'

const contador = ref(0)

function incrementarContador() {
  contador.value++
}
function decrementarContador() {
  contador.value--
}

let ok2 = ref(false);

function mostrar() {
  if (ok2.value == false) {
    ok2.value = true;
  } else {
    ok2.value = false;
  }
}

onMounted(() => {
  console.log(`O valor inicial do contador é ${contador.value}.`)
})
  const rawHtml = '<span style="color: red">Este é um texto em vermelho</span>';

    const numero = 1;
  const ok = true;
  const mensagem = 'programar';

    const nomeEvento = 'click';

  function mostrarAlerta() {
    alert('Botão clicado!');
  };

</script>

<template>
  <body>
<main>
<button @click="incrementarContador">Incrementar</button>
<button @click="decrementarContador">Decrementar</button>
<p>Valor do contador é: {{ contador*10 }}</p>

  <p>Usando interpolação de textos: {{rawHtml}}</p>
  <p>Usando v-html: <span v-html="rawHtml"></span></p>

    <p>{{ numero + 1 }}</p>
  <p>{{ ok ? 'Sim' : 'Não' }}</p>
  <p>{{mensagem.split('').reverse().join('') }}</p>
  <button @click="mostrar">Mostrar?</button>
  <div>{{ ok2 ? "Mostrado" : ""}}</div>

  <button class="clicar" v-on:[nomeEvento]="mostrarAlerta">Clique aqui</button>
  </main>
</body>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 15vw;
}
button {
  font-weight: bold;
}
.clicar {
  margin-top: 2vw;
}
</style>
 -->
<!-- <script setup>
import { ref } from 'vue';
let contador = ref(0);
const nome = 'Davi';
const idade = 16;

function inverter(texto) {
  return texto.split('').reverse().join('');
}

function saudacao() {
  return `Olá, ${nome}!`;
}
function contadorMaisMenos() {
  if (event.target.id == "mais") {
    contador.value += 1;
  }
  if (event.target.id == "menos") {
    contador.value -= 1;
  }
}

</script>

<template>
  <div class="info">
    <h1>Exemplo 1 - Mostrando informações na tela</h1>
    <p>Nome: {{ nome }}</p>
    <p>Idade: {{ idade }} anos</p>
    <hr />
    <p>Para completar 50 anos faltam: {{ 50 - idade }} anos</p>
    <p>O nome tem {{ nome.length }} caracteres</p>
    <p>O nome invertido e em maíusculo é: {{ inverter(nome).toUpperCase() }}</p>
    <hr />
    <p>Exemplo de saudação usando função</p>
    <p>{{ saudacao() }}</p>
    <hr>
    <p>Deseja aumentar ou diminuir o contador?</p>
    <div class="parteFeitaPorMim">
      <div class="buttonContador">
        <label for="mais"><button id="mais" @click="contadorMaisMenos">+</button>Aumentar</label>
        <label for="menos"><button id="menos" @click="contadorMaisMenos">-</button>Diminuir</label>
      </div>
      <p>{{ contador }}</p>
      <div :style="{ backgroundColor: contador > 10 ? `green` : contador == 10 ? `gray` :  `red`, width: `12vw`, padding: `0.01vw 0.5vw`, borderRadius: `16px`, textAlign: `center`, fontSize: `1.5vw` }">
      <p v-if="contador > 10">Valor maior que 10</p>
      <p v-else-if="contador == 10">Valor igual a 10</p>
      <p v-else>Valor menor que 10</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  background-color: rgba(35, 12, 22, 1);
  padding: 20px 30px;
  color: rgb(183, 210, 219);
  border-radius: 10px;
}

h1 {
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}

.parteFeitaPorMim {
  .buttonContador {
    display: flex;
    gap: 2vw;

    label {
      display: flex;
      gap: 0.5vw;
      font-size: 1.5vw;

      button {
        background-color: rgba(35, 12, 22, 1);
        border-radius: 5px;
        color: white;
        width: 2vw;
        height: 2vw;
        font-size: 2vw;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .blocoCor { 
    width: fit-content;
  }
  
}
</style> -->
<!-- <script setup>
  import { reactive, computed } from 'vue';

  const professor = reactive({
    nome: 'Eduardo da Silva',
    disciplinas: [
      'Desenvolvimento Web II',
      'Desenvolvimento de Aplicativos para Dispositivos Móveis'
    ],
  });

  const possuiDisciplinas = computed(() => {
    return professor.disciplinas.length > 0;
  });
</script>

<template>
  <div>
    <h1>Professor</h1>
    <p>Nome: {{ professor.nome }}</p>
    <p v-if="!possuiDisciplinas">O professor não possui disciplinas.</p>
    <div v-else>
      <p>O professor possui disciplinas.</p>
      <ul>
        <li v-for="disciplina in professor.disciplinas" :key="disciplina">
          {{ disciplina }}
        </li>
      </ul>
    </div>
  </div>
</template> -->
<!-- <script setup>
import { computed, ref } from 'vue';

const contador_I = ref(0);
const contador_II = ref(0);
const bolo = ref(false);

function botoes() {
if (event.target.id == "mais-I") { contador_I.value++}
else if (event.target.id == "menos-I") {contador_I.value--}
else if (event.target.id == "mais-II") {contador_II.value++}
else if (event.target.id == "menos-II") {contador_II.value--}
else if (event.target.id == "mais-I-5") { contador_I.value+=5}
else if (event.target.id == "menos-I-5") {contador_I.value-=5}
else if (event.target.id == "mais-II-5") {contador_II.value+=5}
else if (event.target.id == "menos-II-5") {contador_II.value-=5}
}
let somar = computed(() => {
  return contador_I.value+contador_II.value;
}) 

let maiorMenor = computed(() => {
  if (somar.value > 10) {
    return 'O valor da soma dos dois contadores é maior que 10'
  } else if (somar.value === 10) {
    return 'O valor da soma dos dois contadores é igual a 10'
  } else {
    return 'O valor da soma dos dois contadores é menor que 10'
  }
})

let imparPar = computed(() => {
  if (somar.value % 2 == 0) {
    return 'É par';
  } else {
    return 'É ímpar'
  }
})

function onOff() {
  if (bolo.value == true) {
    bolo.value = false;
  } else {bolo.value = true}
}

const bonitinho = computed (() => {
  if (bolo.value) {
    return "😴"
  } else {
    return "🙂"
  }
})

function zerar() {
  contador_I.value = 0;
  contador_II.value = 0;
}
</script>

<template>
<div>
  <label @click="onOff()" for="show" style="font-size: 1.5vw; display: flex; align-items: center; gap: 0.5vw; cursor: pointer;">
  <button v-html="bonitinho" style=" font-size: 1vw; cursor: pointer;"></button>
  <p v-if="bolo" id="show">Mostrar Resultado</p>
  <p v-else  id="show">Esconder Resultado</p>
  </label>
</div>
  <div :style=" { display: bolo ? `none` : `block` }">
<div class="bottom-counter-I">
<h3>Contador I</h3>
<div style="display: flex; gap: 1vw;">
<label for="mais-I"><button id="mais-I" @click="botoes">+</button>Adicionar 1</label>
<label for="menos-I"><button id="menos-I" @click="botoes">-</button>Diminuir 1</label>
<label for="mais-I-5"><button id="mais-I-5" @click="botoes">+</button>Adicionar 5</label>
<label for="menos-I-5"><button id="menos-I-5" @click="botoes">-</button>Diminuir 5</label>

</div>
<p class="counter-I">{{ contador_I }}</p>
</div>
<div class="bottom-counter-II">
<h3>Contador II</h3>
<div style="display: flex; gap: 1vw;">
<label for="mais-II"><button id="mais-II" @click="botoes">+</button>Adicionar</label>
<label for="menos-II"><button id="menos-II" @click="botoes">-</button>Diminuir</label>
<label for="mais-II-5"><button id="mais-II-5" @click="botoes">+</button>Adicionar 5</label>
<label for="menos-II-5"><button id="menos-II-5" @click="botoes">-</button>Diminuir 5</label>
</div>
<p class="counter-I">{{ contador_II }}</p>
</div>
<div class="counter">
<h2>A soma dos dois contadores é:</h2>
<p v-if="somar == 0">O resultado é zero</p>
<p v-else>{{ somar }}</p>
<div><h3 v-html="maiorMenor"></h3></div>
<div><h3 v-html="imparPar"></h3></div>
<label for="" @click="zerar" style="display: flex; gap: 0.5vw; cursor: pointer; font-size: 1.5vw; align-items: center;"><button style="cursor: pointer; width: 1.5vw; height: 1.5vw;">X</button>Zerar</label>
</div>
</div>
</template> -->
<!-- <script setup>
  import { computed, ref } from 'vue';

  const contador1 = ref(0);
  const contador2 = ref(0);
  const valorBooleano = ref(true);

  function incrementar(contador) {
    eval(contador).value++;
  }

  function decrementar(contador) {
    if (eval(contador).value > 0) {
      eval(contador).value--;
    }
  }

  const soma = computed(() => contador1.value + contador2.value);
  const somaPar = computed(() => soma.value % 2 === 0);
  const somaMaiorQue10 = computed(() => soma.value > 10);
</script>

<template>
  <h1>Correção dos exercícios</h1>
  <div class="booleano">
    <button @click="valorBooleano = !valorBooleano">
       {{ valorBooleano ? 'Esconder Resultado' : 'Mostrar Resultado' }}

    </button>
  </div>
  <div v-if="valorBooleano">
    <div class="contador">
      <h2>Contador 1</h2>
      <button @click="incrementar('contador1')">Incrementar</button>
      <button @click="decrementar('contador1')">Decrementar</button>
      <p>Valor: {{ contador1 }}</p>
    </div>
    <div class="contador">
      <h2>Contador 2</h2>
      <button @click="incrementar('contador2')">Incrementar</button>
      <button @click="decrementar('contador2')">Decrementar</button>
      <p>Valor: {{ contador2 }}</p>
    </div>
    <div class="soma">
      <h2>Soma</h2>
      <p>Valor:  {{ soma }} </p>
      <div v-if="somaMaiorQue10">
        <p>A soma é maior que 10</p>
      </div>
      <div v-else>
        <p>A soma é menor que 10</p>
      </div>
      <div v-if="somaPar">
        <p>A soma é par</p>
      </div>
      <div v-else>
        <p>A soma é ímpar</p>
      </div>
    </div>
  </div>
</template> -->
<!-- <script setup>
  const items = ['Item 1', 'Item 2', 'Item 3'];
</script>
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template> -->
<!-- <script setup>
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
  ];
</script>
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template> -->
<!-- <script setup>
  const items = {
    id: 1,
    description: 'Item 1',
    price: 10.0,
  };
</script>
<template>
  <ul>
    <li v-for="(value, key) in items" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template> -->
<!-- <script setup>
  import { ref } from 'vue'

  const novoItem = ref('')
  const listaCompras = ref(['arroz', 'batata', 'feijão'])

  function adicionar() {
    listaCompras.value.push(novoItem.value)
    novoItem.value = ''
  }
</script>

<template>
  <input type="text" v-model="novoItem"/>
  <button @click="adicionar">Adicionar</button>
  <ul>
    <li v-for="item in listaCompras" :key="item">
      {{ item }}
    </li>
  </ul>
  </template> -->
<!-- <script setup>
  import { ref } from 'vue';

  const listaCompras = ref(['arroz', 'batata', 'feijão']);

  function remover(index) {
    listaCompras.value.splice(index, 1);
  }
</script>
<template>
  <ul>
    <li v-for="(item, index) in listaCompras" :key="index">
      {{ item }}<button @click="remover(index)">Remover</button>
    </li>
  </ul>
</template> -->
<!-- <script setup>
  import { ref } from 'vue';

  const listaCompras = ref([
    { nome: 'arroz', quantidade: 1 },
    { nome: 'batata', quantidade: 2 },
    { nome: 'feijão', quantidade: 3 },
  ]);

  function incrementar(index) {
    listaCompras.value[index].quantidade++;
  }
  function decrementar(index) {
    if (listaCompras.value[index].quantidade > 0) {
      listaCompras.value[index].quantidade--;
    }
  }

</script>
<template>
  <ul>
    <li v-for="(item, index) in listaCompras" :key="index">
      {{ item.nome }} - {{ item.quantidade }}
      <button @click="incrementar(index)">Incrementar</button>
      <button @click="decrementar(index)">Incrementar</button>
    </li>
  </ul>
</template> -->
<script setup>
import { computed, reactive, ref } from 'vue';

      let LMP = (nome) => {
            let preposicao = ["a", "ante", "após", "até", "com", "contra", "de", "desde", "em",
            "entre", "para", "perante", "por", "sem", "sob", "sobre", "trás", "da", "de", "do"];
            let nomeComeco;
            let restoNome;
            let nomeCompletoMaiusculo = [];
            let primeiraLetra = nome.split(" ");
            for (let i = 0; i < primeiraLetra.length; i++) {
            let palavraMinuscula = primeiraLetra[i].toLowerCase();
            if (preposicao.includes(primeiraLetra[i])) {
            nomeCompletoMaiusculo.push(palavraMinuscula);    
            }else {
            nomeComeco = primeiraLetra[i].charAt(0);
            restoNome = primeiraLetra[i].substring(1);
            nomeCompletoMaiusculo.push(nomeComeco.toUpperCase() + restoNome)}};
            return nomeCompletoMaiusculo.join(" ");};

const cidade = ref("");
const cidades = reactive([
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Salvador',
  'Fortaleza',
  'Curitiba',
  'Manaus',
  'Recife',
  'Porto Alegre',
  'Brasília',
]);

const cidadeOrganizada = computed(() => {
  return [...cidades].sort();
});

function retirar(tirar) {
  cidades.splice(tirar,1);
};

function adicionar(colocar) {
  if (cidade.value !== "") {
    cidades.push(colocar);
    cidade.value = "";
  }
}
</script>
<template>
<section>
<div style="display: flex;">
  <input type="text" v-model="cidade" placeholder="Adicionar cidade:">  
<button @click="adicionar(LMP(cidade))" style="width: 1.5vw;"></button>
</div>
  <div>
  <h2>Lista de cidades</h2>
<ul>
  <li v-for="(cidade, index) in cidades" :key="cidade">
    {{ cidade }} <button @click="retirar(index)">retirar</button>
  </li>
</ul>
</div>
<div>
  <h2>Lista de cidades ordenadas</h2>
<ul>
  <li v-for="cidade in cidadeOrganizada" :key="cidade">
    {{ cidade }}
  </li>
</ul>
</div>
</section>
</template>
<!-- <script setup>
import { reactive } from 'vue';

const noticias = reactive([
  {
    titulo: 'Flamengo vai até os pênaltis, mas perde para o PSG e amarga vice da Copa Intercontinental',
    data: '17/12/2025',
    resumo: 'O Flamengo fez uma partida gigante contra o rico e poderoso PSG, mas amargou o vice-campeonato da Copa Intercontinental.Nesta quarta-feira (17), o time de Filipe Luís empatou por 1 a 1 no tempo regulamentar e na prorrogação, levando o duelo para os pênaltis de forma hercúlea. Na marca da cal, porém, os franceses ganharam por 2 a 1 e conquistaram o título mundial no Qatar.',
    link: 'https://www.espn.com.br/futebol/artigo/_/id/16093851/flamengo-vai-penaltis-mas-perde-psg-amarga-vice-copa-intercontinental',
    imagem: 'https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F1217%2Fr1590695_1296x729_16%2D9.jpg&w=1140&cquality=40&format=jpg',
  },
  {
    titulo: "Trump ordena bloqueio 'total' de todos os petroleiros sancionados que entrem e saiam da Venezuela",
    data: '16/12/2025',
    resumo: 'O presidente dos Estados Unidos, Donald Trump, disse nesta terça-feira (16/12) que está ordenando um bloqueio "total e completo" de todos os petroleiros sancionados que entram e saem da Venezuela.Em uma publicação em sua rede social, a Truth Social, ele afirmou que o governo venezuelano de Nicolás Maduro foi classificado como uma organização terrorista estrangeira.O americano disse que a Venezuela já teria roubado bens dos EUA, além de acusar o regime de Maduro de "terrorismo, tráfico de drogas e tráfico de pessoas"."Portanto, hoje, estou ordenando um bloqueio total e completo de todos os petroleiros sancionados que entram e saem da Venezuela", acrescentou. O republicano disse que a Venezuela está "completamente cercada pela maior Armada [força naval ou militar] já reunida na história da América do Sul", e acrescentou que isso "só vai aumentar" e "será algo nunca visto antes".',
    link: 'https://www.bbc.com/portuguese/articles/c36zrpp9dppo',
    imagem: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/8cc5/live/fdeff930-db29-11f0-b67b-690eb873de1b.jpg.webp',
  },
]);

</script>

<template>
  <section style="margin-inline: 3vw;" class="main">
  <h1 style="font-size: 4vw;">Notícias</h1>
  <ul style="list-style: none;">
    <li v-for="(noticia, index) in noticias" :key="index">
      <h2 style="font-size: 3vw;">{{ noticia.titulo }}</h2>
      <div>
      <p style=" display: flex; flex-direction: column; gap: 1.5vw;">{{ noticia.resumo }}
        <a :href="noticia.link">Ler mais.</a>
      </p>
      <img target="_blank" :src="noticia.imagem" alt="image/noticia">
      </div>
    </li>
  </ul>
  </section>
</template>

<style>
  .main ul { 
    display: flex;
    flex-direction: column;
    gap: 3vw;
    li {
    text-align: center;
    border-top: 2px solid black;
  div {
    display: flex;
    gap: 1.5vw;
  p {
    flex: 1;
    font-size: 1.5vw;
    padding-inline: 2vw;
    text-align: left;
  }
  img {
    flex: 1;
    width: 100%;
  }
  }
  }
  }
</style> -->