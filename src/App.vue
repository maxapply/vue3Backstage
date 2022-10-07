<script setup>
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
const store = useStore();
// const router = useRouter();
// store.commit("addMenu", router);

store.commit("getTabList");
store.commit("getCurrentMenu");
</script>

<template>
  <router-view />
</template>

<style setup>
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  max-width: 100% !important;
  height: 100vh;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
