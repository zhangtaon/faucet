<template>
  <div class="content" @keyup.right="faucetStore.next()"
  @keyup.left="faucetStore.previous()">
    <img
      ref="img"
      :alt="faucetStore.$state.data.name"
      :src="getImageUrl(faucetStore.$state.data.list[faucetStore.$state.currentIndex].url)"
      @click="faucetStore.next()"
    />
  </div>
</template>
<script setup lang="ts">
  /**
   * 股票走势详情
   * author：zto
   * date: 2022年10月3日
   */
  import { useFaucetStore } from "../stores/faucetStore"; 
  const faucetStore = useFaucetStore();
  //获取图片地址
  function getImageUrl(name) {
    return new URL(`../assets/image/${name}.png`, import.meta.url).href
  } 
</script>
<style>
  .content img{
    width: 100%;
  }
</style>
