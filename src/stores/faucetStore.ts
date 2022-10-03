import { defineStore } from "pinia";

export const useFaucetStore = defineStore("faucet", {
  state: () => {
    return {
      data: {},
      currentIndex:0
    };
  },
  actions: {
    next() {
      if(this.currentIndex+1<this.data.list.length){
        this.currentIndex++
      }else{
        this.currentIndex = 0;
      }
    },
    previous() {
      if(this.currentIndex == 0){
        this.currentIndex = this.data.list.length-1
      }else{
        this.currentIndex--;
      }
    },
  },
});
