<template>
  <div class="shares-item">
    <a-descriptions :column="9">
      <a-descriptions-item label="日期" style="width:150px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].date}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封单量(股)" style="width:170px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].seals}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封单额(元)" style="width:180px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].sealsAmount}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封成比(%)" style="width:150px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].sealsVol}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="放量" style="width:126px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].discharge}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="竞价(%)" style="width:130px">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].bidding}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="竞环比(%)">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].biddingChain}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="封环比(%)">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].sealsChain}}</a-descriptions-item>
      <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="成环比(%)">{{faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].volChain}}</a-descriptions-item>
    </a-descriptions>
    <img
      ref="img"
      :alt="faucetStore.$state.faucet.name"
      :src="faucetStore.$state.faucet.list[faucetStore.$state.currentIndex].url"
      @click="faucetStore.next()"
    />
  </div>
</template>
<script setup lang="ts">
  /**
   * 股票走势详情
   * author：zto
   * date: 2022年10月10日
   */
  import { useFaucetStore } from "../stores/faucetStore"; 
  const faucetStore = useFaucetStore();
</script>
<style scoped>
  .shares-item img{
    width: 100%;
  }
  .shares-item :deep() .ant-descriptions-row > th, 
  .shares-item :deep() .ant-descriptions-row > td {
    padding-bottom: 10px;
  }
  .shares-item :deep() .active .ant-descriptions-item-label,
  .shares-item :deep() .active .ant-descriptions-item-content{
    color: red;
    font-weight: bold;
  }
</style>
