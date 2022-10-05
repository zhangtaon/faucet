<template>
  <div class="content" @keyup.right="faucetStore.next()"
  @keyup.left="faucetStore.previous()">
    <img
      ref="img"
      :alt="faucetStore.$state.data.name"
      :src="faucetStore.$state.data.list[faucetStore.$state.currentIndex].url"
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
</script>
<style>
  .content img{
    width: 100%;
  }
</style>
