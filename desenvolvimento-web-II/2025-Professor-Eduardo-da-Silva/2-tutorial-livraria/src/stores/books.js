import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";

export const importBooks = defineStore( "books", () => {

  const filterText = ref("");

const books = [
  {
    id: 1,
    title: 'Comigo na livraria',
    cover: '/img/covers/comigo-na-livraria.png',
    alt: "Comigo na Livraria Image",
    price: 23.24,
    author: 'Martha Medeiros',
    description: "Comigo na Livraria é uma obra de José Mindlin que reúne crônicas e reflexões sobre a experiência do autor com os livros. O livro celebra o amor pela leitura, as livrarias e a importância do livro como objeto cultural e afetivo.",
  },
  {
    id: 2,
    title: 'Quincas Borba',
    cover: '/img/covers/quincas-borba.png',
    alt: "Quincas Borba Image",
    price: 23.24,
    author: 'Machado de Assis',
    description: "Quincas Borba é um romance de Machado de Assis que narra a ascensão e queda de Rubião, herdeiro da fortuna de Quincas Borba. A obra discute a ambição, a loucura e o egoísmo humano, apresentando uma crítica à sociedade por meio da filosofia do Humanitismo.",
  },
  {
    id: 3,
    title: 'A livraria',
    cover: '/img/covers/a-livraria.png',
    alt: "A Livraria Image",
    price: 13.94,
    author: 'Penelope Fitzgerald',
    description: "A Livraria é uma obra que explora o universo dos livros e da leitura, retratando a livraria como um espaço de encontros, descobertas e memórias. O livro valoriza o papel dos livros na formação cultural e emocional das pessoas.",
  },
  {
    id: 4,
    title: 'A hora da estrela',
    cover: '/img/covers/a-hora-da-estrela.png',
    alt: "A hora da Estrela Image",
    price: 16.84,
    author: 'Clarice Lispector',
    description: "A Hora da Estrela é um romance de Clarice Lispector que acompanha a vida simples e solitária de Macabéa, uma jovem nordestina no Rio de Janeiro. A obra aborda a invisibilidade social, a condição humana e a busca por sentido, com uma narrativa introspectiva e reflexiva.",
  },
  {
    id: 5,
    title: 'O alienista',
    cover: '/img/covers/o-alienista.png',
    alt: "O Alienista Image",
    price: 266.92,
    author: 'Machado de Assis',
    description: "O Alienista é uma novela de Machado de Assis que conta a história do médico Simão Bacamarte e sua obsessão em estudar a loucura humana. A obra utiliza ironia e humor para criticar o autoritarismo científico, as instituições sociais e a fragilidade da razão.",
  },
  {
    id: 6,
    title: 'Mar morto',
    cover: '/img/covers/mar-morto.png',
    alt: "Mar Morto Image",
    price: 13.95,
    author: 'Jorge Amado',
    description: "Mar Morto é um romance de Jorge Amado que retrata o cotidiano dos marinheiros e pescadores da Bahia e de suas famílias. A narrativa destaca o amor, a religiosidade e o sofrimento ligados ao mar, que aparece como uma força dominante e simbólica na vida dos personagens.",
  },
  {
    id: 7,
    title: 'Grande sertão',
    cover: '/img/covers/grande-sertao-veredas.png',
    alt: "Grande Sertão Image",
    price: 26.04,
    author: 'Guimarães Rosa',
    description: "Grande Sertão: Veredas é um romance de João Guimarães Rosa que narra a trajetória de Riobaldo, um ex-jagunço que relembra sua vida no sertão brasileiro. A obra mistura ação e reflexão filosófica, explorando temas como o bem, o mal, o amor e o destino, com uma linguagem inovadora e complexa.",
  },
  {
    id: 8,
    title: 'Flor de poemas',
    cover: '/img/covers/flor-de-poema.png',
    alt: "Flor de Poema Image",
    price: 15.81,
    author: 'Cecília Meireles',
    description: "Flor de Poemas é uma coletânea de poemas de Cecília Meireles que reúne textos marcados pela sensibilidade, musicalidade e reflexão sobre o tempo, a vida e a existência. A obra expressa sentimentos profundos por meio de uma linguagem delicada e simbolista, característica da autora, uma das maiores poetas brasileiras.",
  },
  {
    id: 9,
    title: "Noc Ognia",
    cover: "/img/hero.png",
    alt: "Hero Image",
    price: 650,
    author: 'Schmitt, Eric-Emmanuel',
    description: "Noc ognia é um romance de Erich-Emmanuel Schmitt, que narra a históriade um homem que vive em um mundo onde as pessoas não podem mais sonhar. O livro é uma reflexão sobre a importância dos sonhos e da imaginação na vida humana. Erich-Emmanuel Schmitt é um autor francês conhecido por suas obras que exploram temas filosóficos e existenciais. Ele é um dos autores mais traduzidos da França e suas obras têm sido amplamente elogiadas pela crítica."
  }
];
  function getBookById(id) {
    return books.find((book) => book.id == id)
  }
  const filteredBooks = computed(
    () =>
    books.filter((book) => book.title.toLowerCase().includes(filterText.value.toLowerCase()))
  )
return { filteredBooks, filterText, getBookById }
})