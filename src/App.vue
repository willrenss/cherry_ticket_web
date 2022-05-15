<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
* {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
