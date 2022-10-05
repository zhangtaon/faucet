import { defineStore } from "pinia";
import type { faucet } from "../util/faucet";
import { getImageUrl } from "../util/faucet";


export const useFaucetStore = defineStore("faucet", {
  state: () => {
    return {
      data:<faucet>{},
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
     setFaucetStore(faucet: faucet){
      faucet.list.forEach((item)=>{
        if(item.url.indexOf(":") == -1){
          item.url= getImageUrl(item.url);
        }
      })
      this.data = { ...faucet };
      this.currentIndex = 0;
    }
  },
});
