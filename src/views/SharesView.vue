<template>
  <div class="content">
    <div class="page-title">
      <a-switch v-model:checked="checked" checked-children="图片视图" un-checked-children="列表视图" />
    <span>{{faucetStore.$state.faucet.name}}</span>
    </div>
    <SharesItem v-if="checked"/>
    <SharesList v-else/>
  </div>
</template>
<script setup lang="ts">
  /**
   * 股票展示页
   * author：zto
   * date: 2022年10月3日
   */
  import { useFaucetStore } from "../stores/faucetStore"; 
  import { ref } from "vue";
  import { useRoute } from 'vue-router'
  import SharesItem from "../components/SharesItem.vue"; 
  import SharesList from "../components/SharesList.vue"; 
  const route = useRoute();
  const faucetStore = useFaucetStore();
  const checked = ref(route.params.checked == "false" ? false : true);
</script>
<style scoped>
  .content .page-title{
    margin: 8px 0 0px;
    flex: auto;
    overflow: hidden;
  }
  .content .page-title span{
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5715;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .content .page-title button{
    position: relative;
    bottom: 2px;
    margin-right: 6px;
  }
  
</style>
