<template>
  <div class="films">
    <film-card v-for="film in currentPage" :film="film" :key="film.id" />
  </div>
</template>

<script setup lang="ts">
import { FILMS_ON_PAGE, useFilmsStore } from '@/stores/films-store'
import filmCard from './film-card.vue'
import { computed, onMounted } from 'vue'
import { getFilms } from '@/api/getFilms'

const filmsStore = useFilmsStore()
onMounted(async () => {
  const filmsList = await getFilms()
  filmsStore.$patch({ films: filmsList })
})

const currentPage = computed(() => {
  const start = (filmsStore.page - 1) * FILMS_ON_PAGE
  const end = start + FILMS_ON_PAGE

  return filmsStore.getSortedFilms.slice(start, end)
})
</script>

<style scoped>
.films {
  width: 80%;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
