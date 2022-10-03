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
  import { getImageUrl } from "../util/faucet";

  const faucetStore = useFaucetStore();

</script>
<style>
  .content img{
    width: 100%;
  }
</style>
