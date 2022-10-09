<template>
  <a-radio-group v-model:value="value1" button-style="solid" @change="radioChange">
    <a-radio-button value="0">一板</a-radio-button>
    <a-radio-button value="1">二板</a-radio-button>
    <a-radio-button value="2">三板</a-radio-button>
    <a-radio-button value="3">四版</a-radio-button>
    <a-radio-button value="-1">断板</a-radio-button>
  </a-radio-group>
  <a-table :columns="columns" :data-source="list.value" :pagination="pagination"/>
</template>
<script setup lang="ts">
  /**
   * 股票列表
   * author：zto
   * date: 2022年10月9日
   */
  import {numberOf,getFaucetItemByIndex} from "../util/faucet"; 
  import type { faucetItem } from "../util/faucet";
  import { ref, reactive } from 'vue';
  interface DataItem {
    date: string,
    seals: string,
    sealsAmount: string,
    sealsVol: string,
    discharge: string,
    bidding: string,
    biddingChain: string,
    sealsChain: string,
    volChain: string,
    url: string
}
const numberOf2 = (numberStr: string = "") => {
    const separate = numberStr.indexOf(",");
    const unit = numberStr.indexOf("万");

    let n;
    // 3,896.02万
    if (separate != -1 && unit != -1) {
        n = Number(numberStr.substring(0, separate)) * 10000000 + Number(numberStr.substring(separate + 1, unit)) * 10000
    }
    // 1,294
    if (separate != -1 && unit == -1) {
        n = Number(numberStr.substring(0, separate)) * 1000 + Number(numberStr.substring(separate + 1));
    }
    // 332.02万
    if (separate == -1 && unit != -1) {
        n = Number(numberStr.substring(0, unit)) * 10000;
    }
    // 806.77
    if (separate == -1 && unit == -1 && numberStr != "") {
        n = Number(numberStr);
    }

    return n;
}
  const pagination={
    disabled:true,
    pageSize:100
  };
  const value1 = ref<string>("1");
  let list: (faucetItem | undefined)[] = reactive([]);

  (list as any).value = getFaucetItemByIndex(Number(value1.value));

  const radioChange=(event: Event)=>{
    // console.log("radioChange:.......",(event.target as HTMLInputElement).value)
    (list as any).value = getFaucetItemByIndex(Number((event.target as HTMLInputElement).value));
  }
  const columns = [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '封单量',
    dataIndex: 'seals',
    sorter: {
      compare: (a: DataItem, b: DataItem) => numberOf2( a.seals ) - numberOf2( b.seals ),
      multiple: 1,
    },
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
    },
    // sorter: (a: DataItem, b: DataItem) => a.bidding - b.bidding,
  },
  {
    title: '竞环比',
    dataIndex: 'biddingChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.biddingChain) - numberOf(b.biddingChain),
      multiple: 3,
    },
  },
  {
    title: '封环比',
    dataIndex: 'sealsChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.sealsChain) - numberOf(b.sealsChain),
      multiple: 4,
    },
  },
  {
    title: '成环比',
    dataIndex: 'volChain',
    sorter: {
      compare: (a: faucetItem, b: faucetItem) => numberOf(a.volChain) - numberOf(b.volChain),
      multiple: 5,
    },
  }
];
</script>
<style>
  
</style>
