<template>
  <div class="list">
    <a-radio-group v-model:value="radioVal" button-style="solid" @change="radioChange">
      <a-radio-button :value="0">一板</a-radio-button>
      <a-radio-button :value="1">二板</a-radio-button>
      <a-radio-button :value="2">三板</a-radio-button>
      <a-radio-button :value="3">四版</a-radio-button>
      <a-radio-button :value="-1">断板</a-radio-button>
    </a-radio-group>
    <a-table :columns="columns" :data-source="(list as any).value" :pagination="pagination" :customRow="customRow"
      :scroll="scroll">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'biddingChain'">
          <a-tooltip :title=faucetStore.getAllBiddingChainById(record.pid) color="green"
            :overlayStyle="{maxWidth:'600px'}">
            <span>{{ record.biddingChain }}</span>
          </a-tooltip>
        </template>
      </template>
    </a-table>
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
  import { numberOf } from "../util/faucet";
  import { useFaucetStore } from "../stores/faucetStore";
  import type { faucetItem, faucet } from "../util/faucet";
  import type { SubscriptionCallbackMutationDirect } from "pinia";


  const router = useRouter();
  const faucetStore = useFaucetStore();
  faucetStore.$subscribe((mutation, state) => {
    if (mutation.events) {
      if ((mutation as SubscriptionCallbackMutationDirect).events.key == 'menu') {
        console.log("mutation if：", mutation);
        radioChange();
      }
    } else {
      console.log("mutation else：", mutation);
      radioChange();
    }
  });
  //单选按钮
  const radioVal = ref < number > (1);
  const radioChange = () => {
    (list as any).value = faucetStore.getFaucetItemByIndex(radioVal.value);
  }

  // 列表相关**********************
  // 分页配置
  const pagination = {
    disabled: true,
    pageSize: 100
  };
  // 滚动配置
  const scroll = { y: 780 };
  // 行点击事件
  const customRow = (record: faucetItem) => {
    return {
      onClick: () => {
        faucetStore.setFaucetById(record.pid);
        router.push(`/shares/${faucetStore.$state.faucet.id}/false`);
      }       // 点击行
    };
  };
  // 列表数据
  let list: (faucetItem | undefined)[] = reactive([]);
  (list as any).value = faucetStore.getFaucetItemByIndex(radioVal.value);
  // 列表列配置
  const columns = [
    {
      title: '序号',
      width: 60,
      customRender: (obj: {index:number}) => obj.index + 1
      // customRender: ({index}:number) => index + 1
    },
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '封单量(股)',
      dataIndex: 'seals',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.seals) - numberOf(b.seals),
        multiple: 1,
      }
    },
    {
      title: '封单额(元)',
      dataIndex: 'sealsAmount',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.sealsAmount) - numberOf(b.sealsAmount),
        multiple: 7,
      }
    },
    {
      title: '封成比(%)',
      width: 110,
      dataIndex: 'sealsVol'
    },
    {
      title: '放量',
      width: 80,
      dataIndex: 'discharge',
    },
    {
      title: 'DDZ',
      dataIndex: 'ddz',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.ddz) - numberOf(b.ddz),
        multiple: 6,
      }
    },
    {
      title: '竞价(%)',
      dataIndex: 'bidding',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.bidding) - numberOf(b.bidding),
        multiple: 2,
      }
    },
    {
      title: '竞环比(%)',
      dataIndex: 'biddingChain',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.biddingChain) - numberOf(b.biddingChain),
        multiple: 3,
      },
      key: "biddingChain"
    },
    {
      title: '封环比(%)',
      dataIndex: 'sealsChain',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.sealsChain) - numberOf(b.sealsChain),
        multiple: 4,
      }
    },
    {
      title: '成环比(%)',
      dataIndex: 'volChain',
      sorter: {
        compare: (a: faucetItem, b: faucetItem) => numberOf(a.volChain) - numberOf(b.volChain),
        multiple: 5,
      }
    }
  ];
</script>
<style scoped>
  .list {
    padding-top: 16px;
  }

  .list .ant-radio-group {
    margin-bottom: 16px;
  }
</style>