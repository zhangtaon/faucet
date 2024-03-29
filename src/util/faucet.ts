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
    url: string,
    ddz: string
}

export interface faucet {
    id: string;
    name: string;
    count:number,
    yearLine:number,
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

//数字格式转换
export const numberOf = (numberStr: string) => {
    const separate = numberStr.indexOf(",");
    const unitW = numberStr.indexOf("万");
    const unitY = numberStr.indexOf("亿");

    let n: number = 0;

    if(unitY != -1){
        n = Math.trunc(Number(numberStr.substring(0, unitY)) * 100000000);
    }else{

        // 3,896.02万
        if (separate != -1 && unitW != -1) {
            n = Math.trunc(Number(numberStr.substring(0, separate)) * 10000000 + Number(numberStr.substring(separate + 1, unitW)) * 10000);
        }
        // 1,294
        if (separate != -1 && unitW == -1) {
            n = Math.trunc(Number(numberStr.substring(0, separate)) * 1000 + Number(numberStr.substring(separate + 1)));
        }
        // 332.02万
        if (separate == -1 && unitW != -1) {
            n = Math.trunc(Number(numberStr.substring(0, unitW)) * 10000);
        }
        // 806.77
        if (separate == -1 && unitW == -1 && numberStr != "") {
            n = Math.trunc(Number(numberStr));
        }
    }

    return n;
}