<template>
  <a-layout class="main-view" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <!-- <div class="logo" /> -->
      <MenuConfigButton :collapsed="collapsed" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <pie-chart-outlined />
              <span>股票列表（{{faucetStore.$state.menu.length}}）</span>
            </span>
          </template>
          <a-menu-item v-for="item in faucetStore.$state.menu" :key="item.id" @click="faucetStore.setFaucet(item),go()"
            @keyup.right="faucetStore.next()" @keyup.left="faucetStore.previous()" @keyup.up="up" @keyup.down="down" >
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
          <bar-chart-outlined />
          <span>图表展示</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <router-view />
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
  import { PieChartOutlined, DesktopOutlined, BarChartOutlined } from '@ant-design/icons-vue';
  import { ref } from "vue";
  import MenuConfigButton from "../components/MenuConfigButton.vue";
  import { useFaucetStore } from "../stores/faucetStore";
  const selectedKeys = ref < string[] > (['1']);
  const collapsed = ref < boolean > (false);
  const faucetStore = useFaucetStore();
  const router = useRouter();
  const yearLine = ref < Number > (0);
  const up=(event: Event)=>{
    // console.dir(event.target)
    let target:HTMLLIElement = event.target as HTMLLIElement;
    if(target.previousElementSibling){
      (target.previousElementSibling as HTMLLIElement).focus();
      (target.previousElementSibling as HTMLLIElement).click();
    }
  }
  const down=(event: Event)=>{
    let target:HTMLLIElement = event.target as HTMLLIElement;
    if(target.nextElementSibling){
      (target.nextElementSibling as HTMLLIElement).focus();
      (target.nextElementSibling as HTMLLIElement).click();
    }
  }
  function go() {
    router.push(`/shares/${faucetStore.$state.faucet.id}`);
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

  .main-view .ant-layout-sider-children {
    position: absolute;
    overflow: scroll;
    padding-bottom: 180px;
    width: 100%;
  }

  .main-view .code {
    font-size: 12px;
    padding-left: 3px;
    float: right;
  }
  .main-view .ant-menu-dark .ant-menu-item:focus-visible{
    box-shadow: none;
  }
</style>