interface faucetItem {
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
    return new URL(`../assets/image/${name}.png`, import.meta.url).href
} 