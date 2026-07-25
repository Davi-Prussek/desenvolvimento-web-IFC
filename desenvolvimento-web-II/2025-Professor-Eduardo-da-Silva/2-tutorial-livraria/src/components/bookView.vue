<script setup>
  import { importBooks } from '@/stores/books';
  const { filteredBooks } = importBooks();

  import { useCart } from '@/stores/cart';
  const {addToCart} = useCart()

  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.params.id;

</script>

<template>
  <section style="text-align: center; margin-inline: 8vw;">
    <h1 style="font-size: 3vw;"><span style="color: #27ae60;">Detalhes do livro:</span> {{ filteredBooks[id-1].title }}</h1>
    <div style="display: flex; margin-inline: 2vw; gap: 4vw; margin-bottom: 3vw;">
      <div style="flex: 1; margin-right: 2vw;">
        <p style="border-bottom: 2px solid black; padding-bottom: 2vw; text-align: left; font-size: 2vw;"><span style="color: #27ae60;">Descrição: </span> {{ filteredBooks[id-1].description }}</p>
        <p style="border-bottom: 2px solid black; padding-bottom: 2vw; text-align: left; font-size: 2vw;"><span style="color: #27ae60;">Autor: </span>{{ filteredBooks[id-1].author }}</p>
        <p style="border-bottom: 2px solid black; padding-bottom: 2vw; text-align: left; font-size: 2vw;"><span style="color: #27ae60;">Preço: </span>{{ filteredBooks[id-1].price }} Reais</p>
        <div style="display: flex; justify-content: space-between;">
        <button @click="addToCart(filteredBooks[id-1])" style=" padding: 0.5vw 1vw; display: flex; align-items: center; justify-content: center; gap: 1vw;"><span class="mdi mdi-cart" style="font-size: 2vw;"></span><p style="font-size: 1.5vw;"> Adicionar ao Carrinho</p></button>
        <button class="mdi mdi-heart-outline" style="background-color: white; font-size: 3.5vw; color: #27ae60;"></button>
        </div>
      </div>
      <img style="flex: 1; max-width: 30%; border-radius: 10px;" :src="filteredBooks[id-1].cover" alt="">
    </div>
  </section>
</template>