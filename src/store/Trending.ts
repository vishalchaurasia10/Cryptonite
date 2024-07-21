import { getCache, setCache } from "@/util/cache";
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
    loading: boolean;
    fetchData: (onError: (message: string) => void) => void;
}

const useTrendingStore = create<TrendingState>((set) => ({
    data: [],
    loading: false,
    fetchData: async (onError) => {
        const apiUrl = 'https://api.coingecko.com/api/v3/search/trending';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!,
            },
        };

        const ttl = 5 * 60 * 1000; // 1 hour TTL
        const cacheKey = 'trendingData';

        set({ loading: true });

        try {
            const cachedData = getCache(cacheKey);
            if (cachedData) {
                set({ data: cachedData, loading: false });
                return;
            }

            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            const data = resData.coins.map((coin: any) => ({
                id: coin.item.id,
                name: coin.item.name,
                symbol: coin.item.symbol,
                thumb: coin.item.small,
                price: coin.item.data.price,
                change: coin.item.data.price_change_percentage_24h.usd,
                market_cap: coin.item.data.market_cap,
            }));

            setCache(cacheKey, data, ttl);
            set({ data, loading: false });
        } catch (error) {
            onError('Error fetching trending data');
            console.error('Error fetching trending data:', error);
            set({ loading: false });
        }
    },
}));

export default useTrendingStore;