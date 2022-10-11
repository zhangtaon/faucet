<template>
  <div class="chart">
    <!-- <a-radio-group v-model:value="radioVal" button-style="solid" @change="radioChange">
      <a-radio-button value="1">二板</a-radio-button>
      <a-radio-button value="2">三板</a-radio-button>
      <a-radio-button value="3">四版</a-radio-button>
      <a-radio-button value="-1">断板</a-radio-button>
    </a-radio-group> -->
    <div class="chart-dom" ref="chartDom1"></div>
    <div class="chart-dom" ref="chartDom2"></div>
  </div>
</template>
<script setup lang="ts">
  /**
   * 图标视图
   * author：zto
   * date: 2022年10月11日
   */
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts';
  import { getChartData } from "../util/faucet";

  // 单选按钮
  const radioVal = ref<string>("1");
  const radioChange=(event: Event)=>{
    // chartData1 = getChartData(Number((event.target as HTMLInputElement).value), 10000,false);
    // chartData2 = getChartData(Number((event.target as HTMLInputElement).value), 10000,true);
    // console.log("chartData1:",chartData1);
    // console.log("chartData2:",chartData2);
    // option1.xAxis.data = chartData1.date;
    // option1.series[0].data = chartData1.biddingChain;
    // option2.xAxis.data = chartData2.date;
    // option2.series[0].data = chartData2.biddingChain;

    // option1 && myChart1.setOption(option1);
    // option2 && myChart2.setOption(option2);
  }
  // 图标相关
  type EChartsOption = echarts.EChartsOption;
  let myChart1,myChart2,chartData1,chartData2,option1: EChartsOption,option2: EChartsOption;
  const colors = ['#5470C6','#EE6666','#91CC75'];
  // 声明一个 ref 来存放该元素的引用
  // 必须和模板里的 ref 同名
  const chartDom1 = ref(null);
  const chartDom2 = ref(null);

  onMounted(() => {
    
    myChart1 = echarts.init((chartDom1 as any).value);
    chartData1 = getChartData(Number(radioVal.value), 10000,false);

    myChart2 = echarts.init((chartDom2 as any).value);
    chartData2 = getChartData(Number(radioVal.value), 10000, true);

    option1 = {
      title: {
        text: '2板竞价量增长率<1w'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['竞价量增长率', '空间高度']
      },
      xAxis: {
        type: 'category',
        data: chartData1.date
      },
      yAxis:[
        {
          type: 'value',
          name: '竞价量增长率',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} %'
          }
        },
        {
          type: 'value',
          name: '空间高度',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} 板'
          }
        }
      ],
      series: [
        {
          name:"竞价量增长率",
          data: chartData1.biddingChain,
          type: 'line',
          smooth: true,
        },
        {
          name: '空间高度',
          type: 'bar',
          data: chartData1.count,
          yAxisIndex: 1
        }
      ]
    };
    option2 = {
      title: {
        text: '2板竞价量增长率>1w'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: chartData2.date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: chartData2.biddingChain,
          type: 'line'
        }
      ]
    };
  
    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);
  })
</script>
<style scoped>
  .chart{
    color: #000;
    padding-top: 16px;
  }
  .chart .chart-dom{
    height: 800px;
    width: 100%;
    background: white;
  }
</style>
