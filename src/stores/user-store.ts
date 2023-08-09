import type { User } from '@/api/getUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUser } from '@/api/getUser'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  async function auth(username: string, password: string) {
    user.value = await getUser(username, password)
    return true
  }

  function logout() {
    user.value = null
  }

  function toggleFavorite(id: number) {
    if (user.value?.favoriteFilms.includes(id)) {
      user.value.favoriteFilms = user.value.favoriteFilms.filter((filmId) => {
        return filmId !== id
      })
    } else {
      user.value?.favoriteFilms.push(id)
    }
  }

  function toggleWatchLater(id: number) {
    if (user.value?.watchLater.includes(id)) {
      user.value.watchLater = user.value.watchLater.filter((filmId) => {
        return filmId !== id
      })
    } else {
      user.value?.watchLater.push(id)
    }
  }
  return { user, auth, toggleFavorite, toggleWatchLater, logout }
})
