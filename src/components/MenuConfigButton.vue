<template>
  <a-button type="primary" style="width: 100%;" @click="showDrawer">
    <template #icon>
      <a-tooltip title="股票列表配置" placement="right">
        <setting-outlined v-if="props.collapsed" />
      </a-tooltip>
    </template>
    <span v-if="!props.collapsed">股票列表配置</span>
  </a-button>
  <a-drawer :width="520" class="menu-drawer" title="股票列表配置" placement="left" :visible="visible" @close="onClose">
    <div class="item">
      年线配置：
      <a-radio-group v-model:value="faucetStore.$state.yearLine">
        <a-radio :value="0">全部</a-radio>
        <a-radio :value="1">穿年线</a-radio>
        <a-radio :value="2">非穿年线</a-radio>
      </a-radio-group>
    </div>
    <div class="item">
      高度配置：
      <a-radio-group v-model:value="faucetStore.$state.count">
        <a-radio :value="0">全部</a-radio>
        <a-radio :value="3">3板</a-radio>
        <a-radio :value="4">4板</a-radio>
        <a-radio :value="5">5板</a-radio>
        <a-radio :value="6">6板</a-radio>
        <a-radio :value="7">7板</a-radio>
      </a-radio-group>
    </div>
    <div class="item">
      证券交易所：
      <a-radio-group v-model:value="faucetStore.$state.idFirstCharacter">
        <a-radio value="">全部</a-radio>
        <a-radio value="0">深交所</a-radio>
        <a-radio value="6">上交所</a-radio>
      </a-radio-group>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
  /**
   * menu配置
   * author：zto
   * date: 2022年10月30日
   */
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import { useFaucetStore } from "../stores/faucetStore";

  const props = defineProps(['collapsed'])

  const faucetStore = useFaucetStore();

  const visible = ref < boolean > (false);

  const showDrawer = () => {
    visible.value = true;
  };

  const onClose = () => {
    faucetStore.setMenu();
    visible.value = false;
  };
</script>
<style>
  .menu-drawer {
    color: #000;
  }

  .menu-drawer .item {
    margin-bottom: 10px;
  }
</style>