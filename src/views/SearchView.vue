<template>
  <div class="search wrapper">
    <div class="search__filters wrapper">
      <div class="search__genres">
        <genres-filter
          :active-genres="filmsStore.genres"
          @change="changeGenres"
          class="filters_checkboxes"
        />
      </div>
      <question-list @change="changeQuestions" />
    </div>
    <select-film
      :films="searchStore.getFoundFilms"
      v-if="Object.keys(searchStore.questions).length === 2"
    />
    <h3 v-else>Ответьте на вопросы</h3>
  </div>
</template>

<script setup lang="ts">
import genresFilter from '@/components/genres-filter.vue'
import { useFilmsStore } from '@/stores/films-store'
import { useSearchStore, type SearchQusetions } from '@/stores/search-store'
import { onMounted } from 'vue'
import questionList from '@/components/question-list.vue'
import selectFilm from '@/components/select-film.vue'
import { getFilms } from '@/api/getFilms'

const filmsStore = useFilmsStore()
const searchStore = useSearchStore()

onMounted(async () => {
  filmsStore.$reset()
  searchStore.$reset()
  const filmsList = await getFilms()
  filmsStore.$patch({ films: filmsList })
})

function changeQuestions(questionsList: SearchQusetions) {
  searchStore.$patch({
    questions: questionsList
  })
}

function changeGenres(newList: number[]) {
  filmsStore.$patch({
    genres: newList
  })
}
</script>

<style>
.search.wrapper {
  margin-top: 50px;
}

.search__filters.wrapper {
  padding: 0;
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.search__genres .filters_checkboxes {
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: #eeeeee;
  box-shadow: 0px 3px 7px 2px #c2c2c2;
  border-radius: 16px;
  padding: 20px;
}

.search__genres .filters_checkboxes label {
  width: calc(50% - 5px);
}

.search__questions {
  display: flex;
  min-width: 420px;
  flex-direction: column;
  gap: 10px;
  background-color: #eeeeee;
  box-shadow: 0px 3px 7px 2px #c2c2c2;
  border-radius: 16px;
  padding: 20px;
}

.question__variants {
  flex: 1 1 auto;
  display: flex;
  gap: 10px;
}

.question {
  display: flex;
  gap: 15px;
}

.question h4 {
  width: 115px;
}

.question label {
  display: flex;
  min-width: 50%;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.search__select {
  height: 60vh;
}

.search__film {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #eeeeee;
  box-shadow: 0px 2px 7px 2px #c2c2c2;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 20px;
}

.search__film-poster {
  width: 25%;
}

.search__film-poster img {
  display: block;
  width: 100%;
  border-radius: 16px;
}

.search__film-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  padding: 10px;
}

.search__select-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.search__select-nav button {
  background-color: #cccccc;
  border: unset;
  box-shadow: 0 0 4px #222222da;
  border-radius: 4px;
  max-width: 200px;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}

.search__select-nav button:active {
  box-shadow: inset 0 0 3px #222222da;
}

.unsuit:hover {
  background-color: #ec0c0c91;
}

.suit * {
  text-decoration: none;
  color: #000000;
}

.suit:hover {
  background-color: #06c00091;
}
</style>
