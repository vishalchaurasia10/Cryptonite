import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ExploreData } from "./Explore";
import { watchListData } from "@/util/market";

interface WatchlistState {
    coinId: string[];
    activeCoin: string | null;
    setActiveCoin: (coinId: string | null) => void;
    data: ExploreData[];
    fetchData: () => Promise<void>;
    addCoin: (coinId: string) => void;
    removeCoin: (coinId: string) => void;
}

const WatchlistStore = (set: any, get: any): WatchlistState => ({
    coinId: [],
    data: [],
    activeCoin: null,
    setActiveCoin: (coinId: string | null) => set({ activeCoin: coinId }),
    fetchData: async () => {
        // const coins = get().coinId.join('%2C');
        // if (!coins) return;  // If there are no coins, no need to fetch data.

        // const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`;
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
        //     const data = resData.map((coin: any) => ({
        //         id: coin.id,
        //         name: coin.name,
        //         image: coin.image,
        //         current_price: coin.current_price,
        //         market_cap: coin.market_cap,
        //         total_volume: coin.total_volume,
        //         price_change_1h: coin.price_change_percentage_1h_in_currency,
        //         price_change_1y: coin.price_change_percentage_1y_in_currency,
        //         price_change_24h: coin.price_change_percentage_24h_in_currency,
        //         price_change_30d: coin.price_change_percentage_30d_in_currency,
        //         price_change_7d: coin.price_change_percentage_7d_in_currency
        //     }));
        //     set({ data });
        // } catch (error) {
        //     console.error('Error fetching trending data:', error);
        // }
        set({ data: watchListData });
    },
    addCoin: (coinId: string) => {
        set((state: WatchlistState) => {
            if (state.coinId.includes(coinId)) {
                return state;  // If the coin is already in the list, do nothing.
            }

            const newCoinId = [coinId, ...state.coinId];  // Add the new coin at the start of the list

            if (newCoinId.length > 10) {
                newCoinId.pop();  // Remove the coin from the end if the list exceeds 10 items
            }

            return { coinId: newCoinId };
        });
        get().fetchData();
    },
    removeCoin: (coinId: string) => {
        set((state: WatchlistState) => {
            const newCoinId = state.coinId.filter(id => id !== coinId);
            return { coinId: newCoinId };
        });
        get().fetchData();
    }

});

const useWatchlistStore = create<WatchlistState>()(
    devtools(
        persist(
            WatchlistStore,
            {
                name: "watchlist-storage", // Name of item in the storage (must be unique)
                getStorage: () => localStorage, // Use localStorage to persist the data
            }
        )
    )
);

export default useWatchlistStore;