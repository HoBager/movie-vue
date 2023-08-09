import { defineStore } from 'pinia'
import { useFilmsStore, type Sort, getSort } from './films-store'
import type { Film } from '@/api/getFilms'
import { computed, ref } from 'vue'

export const useSearchStore = defineStore('searchStore', () => {
  const filmsStore = useFilmsStore()
  const questions = ref<SearchQusetions>({})
  const getFoundFilms = computed(() => {
    return sortByQuestions(filmsStore.getSortedByGeneres, questions.value)
  })

  function $reset() {
    questions.value = {}
  }
  return { questions, getFoundFilms, $reset }
})

export interface SearchQusetions {
  [index: string]: string | undefined
  popularity?: string
  vote?: string
}

export function sortByQuestions(films: Film[], filters: SearchQusetions): Film[] {
  const filtersMethod = Object.entries(filters)
  const filteredFilms = filtersMethod.reduce((result, [question, method]) => {
    const sort = method && getSort(method, SEARCH_QUESTIONS[question])

    return sort ? sort(result) : result
  }, films)
  return filteredFilms
}

export const SEARCH_QUESTIONS: { [index: string]: Sort[] } = {
  vote: [
    {
      name: 'Высокая',
      method(list: Film[]) {
        return list.filter(({ vote_average: voteAverage }) => {
          return Number(voteAverage) >= 5
        })
      }
    },
    {
      name: 'Низкая',
      method(list: Film[]) {
        return list.filter(({ vote_average: voteAverage }) => {
          return Number(voteAverage) < 5
        })
      }
    }
  ],
  popularity: [
    {
      name: 'Популярный',
      method(list: Film[]) {
        return list.filter(({ vote_count: voteCount, popularity }) => {
          return Number(voteCount) > 200 && Number(popularity) > 100
        })
      }
    },
    {
      name: 'Неизвестный',
      method(list: Film[]) {
        return list.filter(({ vote_count: voteCount, popularity }) => {
          return Number(voteCount) <= 200 && Number(popularity) <= 100
        })
      }
    }
  ]
}
