<template>
  <div className="question">
    <h4>{{ props.title }}</h4>
    <div className="question__variants">
      <label v-for="{ name } in props.answers" :key="name">
        <input @change="handleChange" :name="title" type="radio" :value="name" />
        {{ name }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sort } from '@/stores/films-store'

interface QuestionProps {
  answers: Sort[]
  title: string
}
const emit = defineEmits<{ (e: 'update:value', value: string): void }>()

function handleChange(event: Event) {
  const radio = event.target as HTMLInputElement
  emit('update:value', radio.value)
}
const props = defineProps<QuestionProps>()
</script>

<style scoped></style>
