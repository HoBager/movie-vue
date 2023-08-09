<template>
  <Teleport to="body">
    <div @click="closeModal" v-if="props.open" class="modal-wrap">
      <div @click.stop="" class="modal-body">
        <form @submit.prevent="auth" class="Login">
          <label>
            login:
            <input v-model="login" type="text" />
          </label>
          <label>
            password:
            <input v-model="password" type="text" />
          </label>
          <button @click.stop="" type="submit">Войти</button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { ref } from 'vue'

const props = defineProps<{ open: boolean }>()
const userStore = useUserStore()

const emit = defineEmits<{ (e: 'close'): void }>()
const login = ref('')
const password = ref('')

async function auth() {
  const accsess = await userStore.auth(login.value, password.value)
  if (accsess) {
    emit('close')
  }
}
function closeModal() {
  emit('close')
}
</script>

<style scoped>
.modal-wrap {
  top: 0;
  left: 0;
  background-color: #22222228;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 0 15px;
  width: 100%;
  min-height: 100%;
  cursor: pointer;
  z-index: 1;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 10px #222222;
  z-index: 100;
  cursor: auto;
}

.Login {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.Login label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.Login button {
  width: 60px;
  height: 30px;
}
</style>
