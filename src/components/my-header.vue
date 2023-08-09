<template>
  <header>
    <nav class="wrapper">
      <div class="header__links">
        <router-link to="/" class="header__link"> Home</router-link>
        <router-link to="/Search" class="header__link">Search</router-link>
      </div>
      <button @click="openModal = true" v-if="!userStore.user" class="Login">Login</button>
      <button @click="userStore.logout" v-else class="Logout">Logout</button>
    </nav>
  </header>
  <login-modal @close="openModal = false" :open="openModal" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import loginModal from './login-modal.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const openModal = ref(false)
</script>

<style scoped>
.wrapper {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}

header {
  background-color: rgb(41, 98, 255);
  height: 50px;
}

.header__links {
  display: flex;
  gap: 50px;
}

header nav {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.header__link {
  text-decoration: none;
  color: #ffffff;
  line-height: 0;
}

.Login,
.Logout {
  cursor: pointer;
  background-color: rgb(79, 206, 67);
  text-decoration: none;
  line-height: 0;
  padding: 15px;
  color: #ffffff;
  border-radius: 4px;
  border: unset;
  box-shadow: 0px 0px 5px 1px #33333377;
}

.Login:active,
.Logout:active {
  box-shadow: inset 0px 0px 5px 1px #333333;
}
</style>
