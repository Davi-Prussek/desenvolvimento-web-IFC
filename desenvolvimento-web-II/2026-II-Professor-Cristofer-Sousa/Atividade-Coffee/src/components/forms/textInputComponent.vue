<template>
  <div class="flex flex-col gap-[0.4vw]">
    <label class="text-[1.2vw]" :for="props.id" :style="`color:${props.colorText}`">{{ props.label }}</label>
    <input class="border-2 border-[#dedede] border-solid rounded-md p-[0.5vw] px-[1vw] text-[1.2vw]" :style="`color:${props.colorText}`" @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)" type="text" :placeholder="props.placeholder" :value="props.modelValue" :id="props.id" :disabled="props.disabled">
  </div>
</template>
<script setup lang="ts">
type Dados = string | null
const props = defineProps<{
  label: string
  id: string
  modelValue: Dados
  placeholder?: string
  disabled?: boolean
  colorText?: string
}>()
const emits = defineEmits<{(e: 'update:modelValue', value: Dados): void}>()
</script>
