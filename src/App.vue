<script setup lang="ts">
  import MainView from "./views/MainView.vue";
  import { ref } from 'vue'

  const status = ref(false);
</script>

<template>
  <header v-if="!status" @click="()=>status=true">
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <a-button type="primary" style="margin: 0 auto;display: inherit;" @click="()=>status=true">登陆</a-button> -->
    <span>龙头主升启动案例</span>
    <h1>———————————————短线成神之路</h1>
  </header>
  <MainView v-else />
</template>

<style scoped>
  header {
    /* margin-top: 200px; */
    line-height: 1.5;
    /* max-height: 100vh; */
    text-align: center;

    background-image: url(./assets/image/logo.jpeg);
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  header span {
    font-size: 90px;
    margin-top: 100px;
    display: inline-block;
    font-family: cursive;
    font-weight: bold;
    /* color: rgb(89, 131, 139); */
    color: var(--color-text);
  }
  h1{
    color: lightseagreen;
  }
</style>