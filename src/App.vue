<template>
  <my-header />
  <main>
    <RouterView />
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
}

.wrapper {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
