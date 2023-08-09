<template>
  <div class="filters_checkboxes">
    <label v-for="{ name, id } in genres" :key="id">
      <input
        :checked="activeGenres.includes(id)"
        @change="handleChange(id)"
        type="checkbox"
        :value="id"
      />
      {{ name }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { getGenres, type Genre } from '@/api/getGenres'
import { onMounted, ref } from 'vue'
const props = defineProps<{ activeGenres: number[] }>()
const emit = defineEmits<{ (e: 'change', ids: number[]): void }>()

const genres = ref<Genre[]>([])
onMounted(async () => {
  genres.value = await getGenres()
})

function handleChange(id: number) {
  const isFavorite = props.activeGenres.includes(id)
  let newValue = [...props.activeGenres]
  if (isFavorite) {
    newValue = newValue.filter((genreId) => genreId !== id)
  } else {
    newValue.push(id)
  }
  emit('change', newValue)
}
</script>

<style scoped>
.filters_checkboxes {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-weight: 500;
}

.filters_checkboxes label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filters_checkboxes label input {
  cursor: pointer;
}
</style>
