import { create } from "zustand";
import { ExploreData } from "@/util/market"; // Adjust the import path accordingly
import { getCache, setCache } from "@/util/cache";

export interface ExploreData {
    id: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_1h: number;
    price_change_1y: number | null; // Allow null values
    price_change_24h: number;
    price_change_30d: number;
    price_change_7d: number;
}

interface ExploreState {
    data: ExploreData[];
    loading: boolean;
    fetchData: (page: number, onError: (message: string) => void) => void;
}

const useExploreStore = create<ExploreState>((set) => ({
    data: [],
    loading: false,
    fetchData: async (page: number = 1, onError) => {
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!
            }
        };

        const ttl = 5 * 60 * 1000; // 1 hour TTL
        const cacheKey = `exploreData_page_${page}`;

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
            const data = resData.map((coin: any) => ({
                id: coin.id,
                name: coin.name,
                image: coin.image,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                total_volume: coin.total_volume,
                price_change_1h: coin.price_change_percentage_1h_in_currency,
                price_change_1y: coin.price_change_percentage_1y_in_currency,
                price_change_24h: coin.price_change_percentage_24h_in_currency,
                price_change_30d: coin.price_change_percentage_30d_in_currency,
                price_change_7d: coin.price_change_percentage_7d_in_currency
            }));

            setCache(cacheKey, data, ttl);
            set({ data, loading: false });
        } catch (error) {
            console.error('Error fetching explore data:', error);
            onError("Failed to fetch Explore Data");
            set({ loading: false });
        }
    },
}));

export default useExploreStore;