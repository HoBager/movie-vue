<template>
  <div className="search__questions">
    <question-item
      v-model:value="questions.vote"
      :answers="SEARCH_QUESTIONS.vote"
      title="Оценка"
      @change="handleChange"
    />
    <question-item
      v-model:value="questions.popularity"
      :answers="SEARCH_QUESTIONS.popularity"
      title="Популярность:"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import questionItem from './question-item.vue'
import { SEARCH_QUESTIONS, type SearchQusetions } from '@/stores/search-store'

const questions = ref<SearchQusetions>({})
const emit = defineEmits<{ (e: 'change', questionsList: SearchQusetions): void }>()

function handleChange() {
  console.log(questions.value)
  emit('change', questions.value)
}
</script>

<style scoped></style>
