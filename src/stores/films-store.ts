import type { Film } from '@/api/getFilms'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFilmsStore = defineStore('films-store', () => {
  const films = ref<Film[]>([])
  const genres = ref<number[]>([])
  const page = ref<number>(1)
  const sortMethod = ref<string>('')
  const date = ref<string>('')

  const getSortedByGeneres = computed(() => {
    return sortByGeneres(films.value, genres.value)
  })
  const getSortedFilms = computed(() => {
    const sortedByDate = sortByDate(films.value, date.value)
    const sortedByGeneres = sortByGeneres(sortedByDate, genres.value)
    const sortType = sortMethod.value && getSort(sortMethod.value, SORT_TYPES)

    const sortedByType = sortType ? sortType(sortedByGeneres) : sortedByGeneres

    return sortedByType
  })

  function setFilms(newfilms: Film[]) {
    films.value = newfilms
  }

  function changeGenres(ids: number[]) {
    genres.value = ids
  }

  function $reset() {
    genres.value = []
    sortMethod.value = ''
    date.value = ''
    page.value = 1
  }
  return {
    films,
    genres,
    page,
    date,
    sortMethod,
    getSortedFilms,
    setFilms,
    changeGenres,
    $reset,
    getSortedByGeneres
  }
})

function sortByGeneres(films: Film[], genres: number[]): Film[] {
  return films.filter(({ genre_ids: genreIds }) => {
    return contains(genreIds, genres)
  })
}

function sortByDate(films: Film[], date: string): Film[] {
  if (!date) return films
  return films.filter((film: Film) => {
    const filmDate = new Date(film.release_date).getFullYear()
    return filmDate === Number(date)
  })
}

function contains(where: number[], what: number[]): boolean {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) == -1) return false
  }
  return true
}

export const FILMS_ON_PAGE = 10

export interface Sort {
  name: string
  method?: sortMethod
}

export type sortMethod = (list: Film[]) => Film[]

export const SORT_DATES = [{ name: '2020' }, { name: '2019' }, { name: '2018' }, { name: '2017' }]

export const SORT_TYPES = [
  {
    name: 'Популярные по убыванию',
    method(list: Film[]) {
      return [...list.sort((a: Film, b: Film) => b.popularity - a.popularity)]
    }
  },
  {
    name: 'Популярные по возрастанию',
    method(list: Film[]) {
      return [...list.sort((a: Film, b: Film) => a.popularity - b.popularity)]
    }
  },
  {
    name: 'Рейтинг по убыванию',
    method(list: Film[]) {
      return [...list.sort((a: Film, b: Film) => b.vote_average - a.vote_average)]
    }
  },
  {
    name: 'Рейтинг по возростанию',
    method(list: Film[]) {
      return [...list.sort((a: Film, b: Film) => a.vote_average - b.vote_average)]
    }
  }
  /*{
    name: 'Сначала избраные',
    method(list: Film[], favoriteList: number[] = []) {
      return [
        ...list.sort((a: Film) => {
          const isFavorite = favoriteList.includes(a.id)
          return isFavorite ? -1 : 1
        })
      ]
    }
  },
  {
    name: 'Посмотреть позже',
    method(list: Film[], watchList: number[] = []) {
      return list.filter((film) => {
        return watchList.includes(film.id)
      })
    }
  }*/
]

export function getSort(name: string, sortList: Sort[]): sortMethod | null {
  const sort = sortList.reduce((method: unknown, type: Sort) => {
    if (type.name === name) {
      return type.method
    }
    return method
  }, null)
  return sort as sortMethod | null
}
