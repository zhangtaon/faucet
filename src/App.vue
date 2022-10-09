<script setup lang="ts">
import MainView from "./views/MainView.vue";
import { ref } from 'vue'

const status = ref(false);
</script>

<template>
  <header v-if="!status">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <a-button type="primary" style="margin: 0 auto;display: inherit;" @click="()=>status=true">登陆</a-button>
  </header>
  <MainView v-else/>
</template>

<style scoped>
header {
  margin-top: 200px;
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}
</style>
