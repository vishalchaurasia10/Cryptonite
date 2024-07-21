import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ExploreData } from "./Explore"; // Adjust the import path accordingly

interface WatchlistState {
    coinId: string[];
    activeCoin: string | null;
    setActiveCoin: (coinId: string | null) => void;
    data: ExploreData[];
    loading: boolean;
    fetchData: (onError: (message: string) => void) => Promise<void>;
    addCoin: (coinId: string, onSuccess: (message: string) => void, onError: (message: string) => void) => void;
    removeCoin: (coinId: string, onSuccess: (message: string) => void) => void;
    loadCoinsFromLocalStorage: (onError: (message: string) => void) => void;
}

const WatchlistStore = (set: any, get: any): WatchlistState => ({
    coinId: [],
    data: [],
    loading: false,
    activeCoin: null,
    setActiveCoin: (coinId: string | null) => set({ activeCoin: coinId }),
    fetchData: async (onError) => {
        const coins = get().coinId.join('%2C');
        if (!coins) return;  // If there are no coins, no need to fetch data.

        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!
            }
        };

        try {
            set({ loading: true });
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
            set({ data, loading: false });
        } catch (error) {
            console.error('Error fetching coin data:', error);
            onError("Failed to fetch coin data.");
        }
    },
    addCoin: (coinId: string, onSuccess, onError) => {
        set((state: WatchlistState) => {
            if (state.coinId.includes(coinId)) {
                onError("Coin is already in the watchlist.");
                return state;  // If the coin is already in the list, do nothing.
            }

            const newCoinId = [coinId, ...state.coinId];  // Add the new coin at the start of the list

            if (newCoinId.length > 10) {
                newCoinId.pop();  // Remove the coin from the end if the list exceeds 10 items
            }

            onSuccess("Coin added to the watchlist.");
            return { coinId: newCoinId };
        });
        get().fetchData(onError);
    },
    removeCoin: (coinId: string, onSuccess) => {
        set((state: WatchlistState) => {
            const newCoinId = state.coinId.filter(id => id !== coinId);
            onSuccess("Coin removed from the watchlist.");
            return { coinId: newCoinId };
        });
        get().fetchData(() => { }); // No need for error handling when removing a coin
    },
    loadCoinsFromLocalStorage: (onError) => {
        const storedCoins = localStorage.getItem('watchlist-storage');
        if (storedCoins) {
            try {
                const parsedCoins = JSON.parse(storedCoins).state.coinId;
                console.log('parsedCoins', parsedCoins);
                set({ coinId: parsedCoins });
                get().fetchData(onError);
            } catch (error) {
                console.error('Error parsing stored watchlist:', error);
                onError("Failed to load watchlist from local storage.");
            }
        }
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