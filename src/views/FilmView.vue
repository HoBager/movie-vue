<template>
  <div class="film content">
    <div class="film__intro">
      <div class="wrapper">
        <div class="film__poster">
          <img src="/public/TestPic.jpg" alt="poster" />
        </div>
        <div class="film__title">
          <h1 class="film__name">{{ filmData.title }}</h1>
          <p class="film__raiting">Рейтинг: {{ filmData.vote_average }}</p>
          <p>{{ filmData.overview }}</p>
        </div>
      </div>
    </div>
    <div class="film__content wrapper">
      <nav>
        <a href="#" class="active">Детали</a>
        <a href="#">Видео</a>
        <a href="#">Актеры</a>
      </nav>
      <div class="film__detail">
        <div class="film__detail-item">
          <h3>Статус</h3>
          <span>Released</span>
        </div>
        <hr />
        <div class="film__detail-item">
          <h3>Дата выхода</h3>
          <span>{{ filmData.release_date }}</span>
        </div>
        <hr />
        <div class="film__detail-item">
          <h3>Продолжительность</h3>
          <span>117 минут</span>
        </div>
        <hr />
        <div class="film__detail-item">
          <h3>Язык оригинала</h3>
          <span>{{ filmData.original_language }}</span>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFilm, type Film } from '@/api/getFilms'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const filmData = ref<Film>({
  adult: false,
  backdrop_path: null,
  genre_ids: [],
  id: 0,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0
})
onMounted(async () => {
  const film = await getFilm(Number(route.params.id))
  if (film) {
    console.log(film)
    filmData.value = film
  } else {
    router.replace('/')
  }
})
</script>

<style scoped>
.film__intro {
  box-shadow: 0px 3px 8px 0px #444444;
}
.film__intro {
  background-color: #444444;
  height: 60vh;
  padding-top: 50px;
  margin-bottom: 30px;
}

.film__intro .wrapper {
  display: flex;
  gap: 100px;
  color: #ffffff;
}

.film__poster {
  width: 70%;
}

.film__poster img {
  max-width: 280px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 2px#111111;
  object-fit: cover;
}

.film__name {
  margin-bottom: 20px;
}

.film__raiting {
  margin-bottom: 20px;
}

.film__content nav {
  display: flex;
  padding-left: 25px;
  border-bottom: 2px solid #bbbbbb;
  padding-bottom: 15px;
  gap: 30px;
}

.film__content nav a {
  color: #1092e9;
  text-decoration: none;
  font-weight: 500;
}

.film__content nav a:hover,
.film__content nav a.active {
  color: #222222;
}

.film__detail-item {
  display: flex;
  max-width: 60%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.film__detail hr {
  border: none;
  border-top: 1px solid #bbbbbb;
}

.film__detail span {
  min-width: 100px;
}
</style>
