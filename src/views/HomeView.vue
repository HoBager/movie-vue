<template>
  <div class="content">
    <films-filter />
    <films-list />
  </div>
</template>

<script setup lang="ts">
import filmsFilter from '@/components/films-filter.vue'
import filmsList from '@/components/films-list.vue'
</script>

<style scoped>
.content {
  display: flex;
  margin: 20px auto 0 auto;
  max-width: 1200px;
  padding: 0 15px;
  gap: 20px;
}

.films {
  width: 80%;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
