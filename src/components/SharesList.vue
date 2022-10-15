<template>
  <div class="shares-list">
    <a-table :columns="columns" :data-source="faucetStore.$state.faucet.list" :pagination="pagination"/>
  </div>
</template>
<script setup lang="ts">
  /**
   * 个股连板列表
   * author：zto
   * date: 2022年10月10日
   */
  import { useFaucetStore } from "../stores/faucetStore"; 
  const faucetStore = useFaucetStore();
  const pagination = {
    pageSize:20
  };
  const columns = [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '封单量(股)',
      dataIndex: 'seals'
    },
    {
      title: '封单额(元)',
      dataIndex: 'sealsAmount'
    },
    {
      title: '封成比(%)',
      dataIndex: 'sealsVol'
    },
    {
      title: '放量',
      dataIndex: 'discharge'
    },
    {
      title: '竞价(%)',
      dataIndex: 'bidding'
    },
    {
      title: '竞环比(%)',
      dataIndex: 'biddingChain'
    },
    {
      title: '封环比(%)',
      dataIndex: 'sealsChain'
    },
    {
      title: '成环比(%)',
      dataIndex: 'volChain'
    }
  ];
</script>
<style scoped>
   .shares-list :deep() .ant-table-wrapper{
    margin-top: 20px;
  }
</style>
