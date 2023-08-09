<template>
  <div class="film-card">
    <img class="poster" src="/public/TestPic.jpg" alt="Poster" />
    <div class="card-info">
      <div class="card-main">
        <div class="card-nav">
          <p>Рейтинг: {{ props.film.vote_average }}</p>
          <div class="card-buttons">
            <button
              @click="addFavorite"
              type="button"
              :class="userStore.user?.favoriteFilms.includes(props.film.id) && `active`"
              class="card-button star"
            ></button>
            <button
              @click="addWatchLater"
              type="button"
              :class="userStore.user?.watchLater.includes(props.film.id) && `active`"
              class="card-button bookmark"
            ></button>
          </div>
        </div>
        <p class="film-title">{{ film.title }}</p>
      </div>
      <router-link :to="`films/${props.film.id}`" class="card-about">Подробнее</router-link>
    </div>
  </div>
  <login-modal @close="openModal = false" :open="openModal" />
</template>

<script setup lang="ts">
import type { Film } from '@/api/getFilms'
import { useUserStore } from '@/stores/user-store'
import loginModal from './login-modal.vue'
import { ref } from 'vue'

const userStore = useUserStore()

interface FilmCardProps {
  film: Film
}
const props = defineProps<FilmCardProps>()

const openModal = ref(false)

function addFavorite() {
  userStore.user ? userStore.toggleFavorite(props.film.id) : (openModal.value = !openModal.value)
}

function addWatchLater() {
  userStore.user ? userStore.toggleWatchLater(props.film.id) : (openModal.value = !openModal.value)
}
</script>

<style scoped>
.film-card {
  display: flex;
  width: calc(50% - 15px);
  border: 1px solid #bbbbbb;
  box-shadow: 5px 3px 10px #bbbbbb;
  border-radius: 8px;
}

.poster {
  max-width: 45%;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
}

.card-main {
  padding: 15px;
}

.card-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-buttons {
  display: flex;
  gap: 10px;
}

.film-title {
  font-weight: 500;
  font-size: 1rem;
}

.card-button {
  width: 20px;
  height: 20px;
  background-position: center;
  background-color: unset;
  background-repeat: no-repeat;
  background-size: cover;
  border: 0;
  cursor: pointer;
}

.card-about {
  display: flex;
  border-top: 1px solid #bbbbbb;
  justify-self: flex-start;
  padding: 15px 30px;
  text-decoration: none;
  color: #222222;
}

.card-about:hover {
  background-color: #cccccc80;
}

.card-about:active {
  background-color: #cccccc;
}

.star {
  background-image: url('/star.png');
}

.star.active {
  background-image: url('/star-active.png');
}

.bookmark {
  background-image: url('/bookmark.png');
}

.bookmark.active {
  background-image: url('/bookmark-active.png');
}
</style>
