<template>
  <div class="list">
    <a-radio-group v-model:value="radioVal" button-style="solid" @change="radioChange">
      <a-radio-button value="0">一板</a-radio-button>
      <a-radio-button value="1">二板</a-radio-button>
      <a-radio-button value="2">三板</a-radio-button>
      <a-radio-button value="3">四版</a-radio-button>
      <a-radio-button value="-1">断板</a-radio-button>
    </a-radio-group>
    <a-table :columns="columns" :data-source="(list as any).value" :pagination="pagination" :customRow="customRow" :scroll="scroll"/>
  </div>
</template>
<script setup lang="ts">
  /**
   * 股票列表
   * author：zto
   * date: 2022年10月9日
   */
  import { useRouter } from 'vue-router'
  import { ref, reactive } from 'vue';
  import {numberOf, getFaucetItemByIndex, getFaucetById} from "../util/faucet"; 
  import { useFaucetStore } from "../stores/faucetStore"; 
  import type { faucetItem, faucet } from "../util/faucet";

  const router = useRouter();
  const faucetStore = useFaucetStore();

  //单选按钮
  const radioVal = ref<string>("1");
  const radioChange=(event: Event)=>{
    (list as any).value = getFaucetItemByIndex(Number((event.target as HTMLInputElement).value));
  }

  // 列表相关**********************
  // 分页配置
  const pagination = {
    disabled:true,
    pageSize:100
  };
  // 滚动配置
  const scroll= { y: 780 };
  // 行点击事件
  const customRow = (record: faucetItem) => {
    return {
      onClick: () => {
        faucetStore.setFaucetStore((getFaucetById(record.pid) as faucet));
        router.push(`/shares/${faucetStore.$state.data.id}/false`);
      }       // 点击行
    };
  };
  // 列表数据
  let list: (faucetItem | undefined)[] = reactive([]);
  (list as any).value = getFaucetItemByIndex(Number(radioVal.value));
  // 列表列配置
  const columns = [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '封单量',
    dataIndex: 'seals',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf( a.seals ) - numberOf( b.seals ),
      multiple: 1,
    }
  },
  {
    title: '封单额',
    dataIndex: 'sealsAmount'
  },
  {
    title: '封成比',
    dataIndex: 'sealsVol'
  },
  {
    title: '放量',
    dataIndex: 'discharge'
  },
  {
    title: '竞价',
    dataIndex: 'bidding',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.bidding) - numberOf(b.bidding),
      multiple: 2,
    }
  },
  {
    title: '竞环比',
    dataIndex: 'biddingChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.biddingChain) - numberOf(b.biddingChain),
      multiple: 3,
    }
  },
  {
    title: '封环比',
    dataIndex: 'sealsChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.sealsChain) - numberOf(b.sealsChain),
      multiple: 4,
    }
  },
  {
    title: '成环比',
    dataIndex: 'volChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.volChain) - numberOf(b.volChain),
      multiple: 5,
    }
  }
];
</script>
<style scoped>
  .list{
    padding-top: 16px;
  }
  .list .ant-radio-group{
    margin-bottom: 16px;
  }
</style>
