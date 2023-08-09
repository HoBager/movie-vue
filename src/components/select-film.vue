<template>
  <div v-if="currentFilm" className="search__select">
    <div className="search__film">
      <div className="search__film-poster">
        <img src="/TestPic.jpg" alt="poster" />
      </div>
      <div className="search__film-info">
        <h3>{{ currentFilm.title }}</h3>
        <div className="search__film-genres">
          <p>{{ 'Жанр: ' }}</p>
        </div>
        <div className="search__film-title">{{ currentFilm.overview }}</div>
      </div>
    </div>
    <div className="search__select-nav">
      <button className="unsuit" @click="index++">Не подходит</button>
      <button className="suit">
        <RouterLink :to="`/films/${currentFilm.id}`">Подходит</RouterLink>
      </button>
    </div>
  </div>
  <h3 v-else>Не найдено ничего подходящего попробуйте изменить фильтры</h3>
</template>

<script setup lang="ts">
import type { Film } from '@/api/getFilms'
import { computed, ref, watch } from 'vue'

interface SelectFilmProps {
  films: Film[]
}
const index = ref(0)
const props = defineProps<SelectFilmProps>()
const currentFilm = computed(() => props.films[index.value])
watch(props, () => (index.value = 0))
</script>

<style scoped></style>
