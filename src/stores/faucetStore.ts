import { defineStore } from "pinia";
import type { faucet, faucetItem } from "../util/faucet";
import { getImageUrl, numberOf } from "../util/faucet";
import data from "../data.json";

// const menu: (faucet | undefined)[] = data.data.reverse();

export const useFaucetStore = defineStore("faucet", {
  state: () => {
    return {
      faucet:<faucet>{},
      currentIndex:0,
      yearLine:0,
      menu: <faucet[]>data.data.reverse() 
    };
  },
  actions: {
    next() {
      if(this.currentIndex+1<this.faucet.list.length){
        this.currentIndex++
      }else{
        this.currentIndex = 0;
      }
    },
    previous() {
      if(this.currentIndex == 0){
        this.currentIndex = this.faucet.list.length-1
      }else{
        this.currentIndex--;
      }
    },
    setFaucet(faucet: faucet){
      faucet.list.forEach((item)=>{
        if(item.url.indexOf(":") == -1){
          item.url= getImageUrl(item.url);
        }
      })
      this.faucet = { ...faucet };
      this.currentIndex = 0;
    },
    setFaucetById(id: string){
      this.setFaucet(this.menu.find((item) => item.id == id) as faucet);
    },
    // 设置菜单列表数据
    setMenuByYearLine(yearLine: number){
      let menu: (faucet)[] = [];
      if(yearLine){
        data.data.forEach((faucet: faucet)=>{
          if(faucet.yearLine == yearLine){
            menu.push(faucet);
          }
        })
      }else{
        menu = data.data;
      }
      this.menu = menu;
    },
    // 指定几板数据
    getFaucetItemByIndex(index: number){
      const list: (faucetItem | undefined)[] = [];
      this.menu.forEach((item) => {
          if (index != -1) {
              list.push(item.list[index]);
          } else {
              list.push(item.list.find((innerItem) => innerItem.seals == ""));
          }
      })
      return list;
    },
    // 获取图表数据
    getChartData(index: number, num: number, pass: boolean){
      const chartData = { date: <any>[], biddingChain: <any>[], count: <any>[] };
      this.menu.forEach((item) => {
          let biddingChain;
          let date;
          if (index != -1) {
              biddingChain = numberOf(item.list[index].biddingChain);
              date = item.list[index].date;
          } else {
              let brokenItem = item.list.find((innerItem) => innerItem.seals == "");
              biddingChain = numberOf(brokenItem!.biddingChain);
              date = brokenItem!.date;
          }
          if(pass){
              if(biddingChain>num){
                  chartData.date.push(date);
                  chartData.biddingChain.push(biddingChain);
              }
          }else{
              if(biddingChain<num){
                  chartData.date.push(date);
                  chartData.biddingChain.push(biddingChain);
                  chartData.count.push(item.count);
              }
          }
      })
      return chartData;
    }
  },
});
