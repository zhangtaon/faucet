import data from "../data.json";
export interface faucetItem {
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

// const innerData = ref<faucet[]>();
// innerData.value = data.data;
// console.log("innerData......aaaa:",innerData.value);

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

//指定几板数据
export const getFaucetItemByIndex = (index: number) => {
    const list: (faucetItem | undefined)[] = [];
    data.data.forEach((item) => {
        if(index != -1){
            list.push(item.list[index]);
        }else{
            list.push(item.list.find((innerItem)=>innerItem.seals==""));
        }
    })
    return list;
}