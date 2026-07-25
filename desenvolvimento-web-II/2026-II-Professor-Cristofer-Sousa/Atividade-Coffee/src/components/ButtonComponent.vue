<template>
<button class="
            bg-[#5e3007]
            hover:bg-[#472404]
            flex
            justify-center
            items-center
            gap-[1vw]
            rounded-[10px]
            text-white
            py-[1vw]
            px-[3vw]
            text-[1.4vw]
          ">
  <i v-if="props.icon !== null || props.icon !== ''" :class="props.icon"></i>
  {{ props.label }}
</button>
</template>
<script setup lang="ts">
const props = defineProps<{
label?: string
icon?: string
}>()
</script>
