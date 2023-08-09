import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FilmView from '@/views/FilmView.vue'
import SearchView from '@/views/SearchView.vue'
const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/films/:id',
    component: FilmView
  },
  {
    path: '/search',
    component: SearchView
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})
