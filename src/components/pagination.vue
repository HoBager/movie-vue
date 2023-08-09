<template>
  <div class="pagination">
    <div class="nav">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber === 1" class="back">
        Назад
      </button>
      <button
        @click="changePage(pageNumber + 1)"
        :disabled="pageNumber === countPages"
        class="next"
      >
        Вперед
      </button>
    </div>
    <p class="page-nuber">
      {{ `${props.pageNumber || 1} of ${countPages || 1}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps<{ pageNumber: number; countFilms: number }>()
const countPages = computed(() => {
  return Math.ceil(props.countFilms / 10)
})

watch(countPages, () => {
  if (props.pageNumber > countPages.value || props.pageNumber < 1) {
    emit('changePage', countPages.value)
  }
})

function changePage(newPage: number) {
  if (newPage > countPages.value || newPage < 1) {
    emit('changePage', props.pageNumber)
  } else {
    emit('changePage', newPage)
  }
}

const emit = defineEmits<{ (e: 'changePage', newPage: number): void }>()
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.page-nuber {
  font-size: 14px;
}

.pagination .nav {
  display: flex;
  gap: 10px;
}

.pagination button {
  background-color: rgb(41, 98, 255);
  border: unset;
  color: #ffffff;
  text-decoration: none;
  padding: 7px 20px;
  cursor: pointer;
}

.back {
  border-radius: 4px 0 0 4px;
}

.next {
  border-radius: 0 4px 4px 0;
}

.pagination button:disabled,
.next.unactive {
  background-color: rgba(102, 141, 250, 0.788);
}
</style>
