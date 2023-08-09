<template>
  <div className="filters">
    <h2>Фильтры:</h2>
    <button @click="filmsStore.$reset" class="reset_filters">Сбросить все фильтры</button>
    <my-select
      v-model:value="filmsStore.sortMethod"
      label="Сортировать по:"
      class="sort"
      :options="SORT_TYPES"
    />
    <my-select
      v-model:value="filmsStore.date"
      label="Год релиза:"
      class="sort"
      :options="SORT_DATES"
    />
    <genres-filter :active-genres="filmsStore.genres" @change="changeGenres" />
    <pagination
      @change-page="changePage"
      :page-number="filmsStore.page"
      :count-films="filmsStore.getSortedFilms.length"
    />
  </div>
</template>

<script setup lang="ts">
import genresFilter from './genres-filter.vue'
import mySelect from './my-select.vue'
import { SORT_TYPES, SORT_DATES, useFilmsStore } from '@/stores/films-store'
import Pagination from './pagination.vue'
import { onMounted } from 'vue'

const filmsStore = useFilmsStore()

function changePage(newPage: number) {
  filmsStore.$patch({
    page: newPage
  })
}
function changeGenres(newList: number[]) {
  filmsStore.$patch({
    genres: newList
  })
}

onMounted(() => {
  filmsStore.$reset()
})
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 20%;
  max-height: 750px;
  padding: 20px 15px 15px 15px;
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  box-shadow: 5px 3px 10px #bbbbbb;
}

.reset_filters {
  background-color: #444444;
  font-size: 14px;
  border: unset;
  padding: 8px;
  color: #ffffff;
  border-radius: 3px;
}

.reset_filters:hover {
  background-color: #333333;
  cursor: pointer;
}

.reset_filters:active {
  background-color: #222222;
}
</style>
