<template>
  <label class="filters_label">
    {{ props.label }}
    <select :value="value" @change="handleChange" class="sort">
      <option selected value="">По умолчанию</option>
      <option v-for="option in options" :key="option?.name" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import type { Sort } from '@/stores/films-store'

interface Props {
  label?: string
  options: Sort[]
  value: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:value', value: string): void }>()
function handleChange(event: Event) {
  const select = event.target as HTMLSelectElement
  emit('update:value', select.value)
}
</script>

<style scoped>
.filters_label select {
  width: 100%;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px;
}

.filters_label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
