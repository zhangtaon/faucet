<template>
  <a-layout class="main-view" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <pie-chart-outlined />
              <span>个股</span>
            </span>
          </template>
          <a-menu-item v-for="item in data.data" :key="item.id" @click="faucetStore.setFaucetStore(item),go()">
            <span>{{item.name}}</span>
            <span>{{item.count}}</span>
            <span class="code">({{item.id}})</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="list" @click="()=>{router.push('/list')}">
          <desktop-outlined />
          <span>列表</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 5 16px">
        <a-descriptions :title="faucetStore.$state.data.name"  :column="9" v-if="router.currentRoute.value.name == 'shares'">
          <a-descriptions-item label="日期" style="width:150px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].date}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封单量(股)" style="width:170px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].seals}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封单额(元)" style="width:180px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].sealsAmount}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="封成比(%)" style="width:150px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].sealsVol}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':!faucetStore.$state.currentIndex}" label="放量" style="width:126px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].discharge}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="竞价(%)" style="width:130px">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].bidding}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="竞环比(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].biddingChain}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="封环比(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].sealsChain}}</a-descriptions-item>
          <a-descriptions-item :class="{'active':faucetStore.$state.currentIndex}" label="成环比(%)">{{faucetStore.$state.data.list[faucetStore.$state.currentIndex].volChain}}</a-descriptions-item>
        </a-descriptions>
        <div v-if="router.currentRoute.value.name =='list'">
          列表数据
        </div>
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
  import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons-vue';
  import { ref } from "vue";
  import data from "../data.json"; 
  import { useFaucetStore } from "../stores/faucetStore"; 
  const selectedKeys = ref<string[]>(['1']);
  const collapsed = ref<boolean>(false);
  const faucetStore = useFaucetStore();
  const router = useRouter();
  //反转数组
  data.data.reverse();

  function go(){
    router.push(`/shares/${faucetStore.$state.data.id}`);
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
.main-view .ant-layout-sider-children{
  position: absolute;
  overflow: scroll;
  padding-bottom: 180px;
  width: 100%;
}
.main-view .code{
  font-size: 12px; 
  padding-left: 3px;
  float: right;
}
.active .ant-descriptions-item-label,
.active .ant-descriptions-item-content{
  color: red;
  font-weight: bold;
}
</style>