import { defineStore } from "pinia";
import type { faucet, faucetItem } from "../util/faucet";
import { getImageUrl, numberOf } from "../util/faucet";
import data from "../data.json";

// const menu: (faucet | undefined)[] = data.data.reverse();

export const useFaucetStore = defineStore("faucet", {
  state: () => {
    return {
      faucet:<faucet>{},//当前浏览股票
      currentIndex:0,//当前股票浏览到第几板
      yearLine:0,//穿年线
      count:0,//一次性连板数量
      idFirstCharacter:'',//股票代码首字符(用于判断股票所属交易所)
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
    // 设置当前浏览某支票
    setFaucetById(id: string){
      this.setFaucet(this.menu.find((item) => item.id == id) as faucet);
    },
    // 获取某支票所有的竞环比数据
    getAllBiddingChainById(id: string){
      const faucet = this.menu.find((item) => item.id == id) as faucet;
      const biddingChains: string[] = [];
      faucet.list.forEach((item) =>{
        biddingChains.push(item.biddingChain)
      })
      return biddingChains.join(" ♍️ ");
    },
    // 设置菜单列表数据
    setMenu(){
      let menu: (faucet)[] = [];
      if(this.yearLine){
        menu = data.data.filter((faucet: faucet)=>{
          return faucet.yearLine == this.yearLine;
        })
      }else{
        menu = data.data;
      }
      if(this.count){
        menu = menu.filter((faucet: faucet)=>{
          return faucet.count == this.count;
        })
      }
      if(this.idFirstCharacter){
        menu = menu.filter((faucet: faucet)=>{
          return faucet.id.indexOf(this.idFirstCharacter) == 0;
        })
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
                  chartData.count.push(item.count);
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
