import { trendingData } from './../util/trending';
import { create } from "zustand";

export interface TrendingData {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    price: number;
    change: number;
    market_cap: string;
}

interface TrendingState {
    data: TrendingData[];
    fetchData: () => void;
}

const useTrendingStore = create<TrendingState>((set) => ({
    data: [],
    fetchData: async () => {
        // const apiUrl = 'https://api.coingecko.com/api/v3/search/trending';
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!
        //     }
        // };

        // try {
        //     const response = await fetch(apiUrl, options);
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const resData = await response.json();
        //     const data = resData.coins.map((coin: any) => ({
        //         id: coin.item.id,
        //         name: coin.item.name,
        //         symbol: coin.item.symbol,
        //         thumb: coin.item.small,
        //         price: coin.item.data.price,
        //         change: coin.item.data.price_change_percentage_24h.usd,
        //         market_cap: coin.item.data.market_cap
        //     }));
        //     set({ data });
        // } catch (error) {
        //     console.error('Error fetching trending data:', error);
        // }
        set({ data: trendingData });
    }
}));

export default useTrendingStore;