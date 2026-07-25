<template>
  <div class="flex flex-col gap-[0.4vw]">
    <label class="text-[1.2vw]" :for="props.id" :style="`color:${props.colorText}`">{{ props.label }}</label>
    <div class="flex border-2 border-[#dedede] border-solid rounded-md overflow-hidden">
      <button type="button" class="px-[1vw] text-[1vw]" @click="emits('update:modelValue',Math.max(Number(props.min ?? -Infinity),(props.modelValue ?? 0) - Number(props.step ?? 1),),)"><i class="fi fi-rr-minus"></i></button>
      <input class="number-input flex-1 text-center p-[0.5vw] text-[1.2vw] outline-none" :style="`color:${props.colorText}`" type="number" :value="props.modelValue?.toFixed(1)" :id="props.id" :disabled="props.disabled" :min="props.min" :max="props.max" :step="props.step" @input="emits('update:modelValue', Number(($event.target as HTMLInputElement).value))"/>
      <button type="button" class="px-[1vw] text-[1vw]" @click=" emits( 'update:modelValue', Math.min( Number(props.max ?? Infinity), (props.modelValue ?? 0) + Number(props.step ?? 1),),)"><i class="fi fi-rr-plus"></i></button>
    </div>
  </div>
</template>
<script setup lang="ts">
type Dados = number | null
const props = defineProps<{
  label: string
  id: string
  modelValue: Dados
  disabled?: boolean
  colorText?: string
  min?: number
  max?: number
  step?: number
}>()
const emits = defineEmits<{(e: 'update:modelValue', value: Dados): void}>()
</script>
<style scoped>.number-input::-webkit-outer-spin-button,.number-input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}.number-input {-moz-appearance: textfield;appearance: textfield;}</style>
