import { number } from "vue-types";
import data from "../data.json";
export interface faucetItem {
    pid: string,
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

export interface faucet {
    id: string;
    name: string;
    list: faucetItem[];
}

//获取图片地址
export const getImageUrl = (name: string) => {
    // return new URL(`../assets/image/${name}.png`, import.meta.url).href
    const img = new URL(`../assets/image/${name}.png`, import.meta.url)
    //图片缓存处理
    new Image().src = img.href;
    return img.href;
}
//获取图片地址
export const numberOf = (numberStr: string) => {
    const separate = numberStr.indexOf(",");
    const unit = numberStr.indexOf("万");

    let n: number = 0;

    // 3,896.02万
    if (separate != -1 && unit != -1) {
        n = Math.trunc(Number(numberStr.substring(0, separate)) * 10000000 + Number(numberStr.substring(separate + 1, unit)) * 10000);
    }
    // 1,294
    if (separate != -1 && unit == -1) {
        n = Math.trunc(Number(numberStr.substring(0, separate)) * 1000 + Number(numberStr.substring(separate + 1)));
    }
    // 332.02万
    if (separate == -1 && unit != -1) {
        n = Math.trunc(Number(numberStr.substring(0, unit)) * 10000);
    }
    // 806.77
    if (separate == -1 && unit == -1 && numberStr != "") {
        n = Math.trunc(Number(numberStr));
    }

    return n;
}
//指定几板数据
export const getFaucetItemByIndex = (index: number) => {
    const list: (faucetItem | undefined)[] = [];
    data.data.forEach((item) => {
        if (index != -1) {
            list.push(item.list[index]);
        } else {
            list.push(item.list.find((innerItem) => innerItem.seals == ""));
        }
    })
    return list;
}
//获取股票
export const getFaucetById = (id: string) => {
    return data.data.find((item) => item.id == id);
}
//获取图标数据
export const getChartData = (index: number, num: number, pass: boolean) => {
    // console.log("index:",index,typeof index)
    const chartData = { date: <any>[], biddingChain: <any>[], count: <any>[] };
    data.data.forEach((item) => {
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