<template>
  <v-app>
    <map-page></map-page>
  </v-app>
</template>

<script>
import MapPage from './pages/MapPage.vue';

export default {
  name: 'App',
  components: {
    MapPage
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
