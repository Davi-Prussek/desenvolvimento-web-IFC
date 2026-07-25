<template>
<div class="flex items-start justify-between border-[1.6px] border-[#dedede] border-solid px-[2.5vw] py-[1vw] rounded-xl gap-[2.5vw]">
  <div :style="{ backgroundColor: '#' + props.colorBackground }" class="p-[1.5vw] rounded-full"><img class="w-[4.5vw] h-[4.5vw]" :src="'../../public/icons/'+props.img.src" :alt="props.img.alt"></div>
  <div class="text-center flex flex-col gap-[1vw]">
    <h3 class="text-[1.4vw] font-semibold">{{ props.titulo }}</h3>
    <p :class="`text-[#${props.colorValor}]`" class="font-bold text-[3vw]">{{ props.valor }}</p>
    <div class="flex flex-col gap-[0.2vw]">
      <p class="text-[1.4vw] font-bold">{{ props.desc }}</p>
    <p class="text-[1.4vw] text-[#424242]">{{ props.descsecundaria }}</p>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
type notaTipos = string | number

interface imagem {
  src: string
  alt: string
}
const props = defineProps<{
  img: imagem
  titulo: string
  valor: notaTipos
  desc?: string | null
  descsecundaria?: string | null
  colorValor: string
  colorBackground?: string
}>()
</script>
