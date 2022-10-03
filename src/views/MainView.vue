<template>
  <a-layout class="main-view" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in data.data" :key="item.id" @click="go(item)">
          <pie-chart-outlined />
          <span>{{item.name}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 5 16px">
        <a-descriptions :title="faucetStore.$state.data.name"  :column="8">
          <a-descriptions-item label="日期">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].date}}</a-descriptions-item>
          <a-descriptions-item label="放量">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].discharge}}</a-descriptions-item>
          <a-descriptions-item label="封单量">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].seals}}</a-descriptions-item>
          <a-descriptions-item label="封单额">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].sealsAmount}}</a-descriptions-item>
          <a-descriptions-item label="竞价(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].bidding}}</a-descriptions-item>
          <a-descriptions-item label="封环比(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].sealsChain}}</a-descriptions-item>
          <a-descriptions-item label="成环比(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].volChain}}</a-descriptions-item>
        </a-descriptions>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <RouterView />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        龙头主升启动案例 ©2022 Created by zto
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  /**
   * 龙头案例主页面
   * author：zto
   * date: 2022年10月3日
   */
  import { useRouter } from 'vue-router'
  import data from "../data.json"; 
  import { useFaucetStore } from "../stores/faucetStore"; 
  import { ref } from "vue";
  import { PieChartOutlined } from '@ant-design/icons-vue';

  const selectedKeys = ref<string[]>(['1']);
  const collapsed = ref<boolean>(false);

  const faucetStore = useFaucetStore();
  const router = useRouter();

  const go=(item)=>{
      faucetStore.$state.data = {...item};
      faucetStore.$state.currentIndex = 0;
      router.push(`/shares/${item.id}`);
    }
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.main-view .ant-descriptions-header{
  margin: 8px 0 0px;
}
.main-view .ant-layout-header{
  padding: 0 16px;
}
</style>