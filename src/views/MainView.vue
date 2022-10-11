<template>
  <a-layout class="main-view" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <pie-chart-outlined />
              <span>股票列表</span>
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
          <span>数据分析</span>
        </a-menu-item>
        <a-menu-item key="chart" @click="()=>{router.push('/chart')}">
          <desktop-outlined />
          <span>图表展示</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <router-view/>
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
</style>