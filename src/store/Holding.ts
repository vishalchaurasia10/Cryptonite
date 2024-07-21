import { getCache, setCache } from "@/util/cache";
import { create } from "zustand";

export interface CoinHolding {
    name: string;
    symbol: string;
    country: string;
    total_holdings: number;
    total_entry_value_usd: number;
    total_current_value_usd: number;
    percentage_of_total_supply: number;
}

interface HoldingState {
    data: { btc: CoinHolding[], eth: CoinHolding[] };
    loading: boolean;
    fetchData: (onError: (message: string) => void) => void;
}

const useHoldingStore = create<HoldingState>((set) => ({
    data: { btc: [], eth: [] },
    loading: false,
    fetchData: async (onError) => {
        const coins = ['bitcoin', 'ethereum'];
        const apiUrl = 'https://api.coingecko.com/api/v3/companies/public_treasury/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!,
            },
        };

        const ttl = 5 * 60 * 1000; // 1 hour TTL
        const cacheKey = (coin: string) => `coinHolding_${coin}`;

        set({ loading: true });

        try {
            const fetchCoinData = async (coin: string) => {
                const cachedData = getCache(cacheKey(coin));
                if (cachedData) {
                    return cachedData;
                }
                const response = await fetch(`${apiUrl}${coin}`, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCache(cacheKey(coin), data, ttl);
                return data;
            };

            const [btcData, ethData] = await Promise.all(coins.map(fetchCoinData));

            const processCoinData = (coinData: any): CoinHolding[] => {
                return coinData.companies.map((item: any) => ({
                    name: item.name,
                    symbol: item.symbol,
                    country: item.country,
                    total_holdings: item.total_holdings,
                    total_entry_value_usd: item.total_entry_value_usd,
                    total_current_value_usd: item.total_current_value_usd,
                    percentage_of_total_supply: item.percentage_of_total_supply,
                }));
            };

            set({
                data: {
                    btc: processCoinData(btcData),
                    eth: processCoinData(ethData),
                },
                loading: false,
            });
        } catch (error) {
            onError('Failed to fetch Company Holding Data');
            console.error("Failed to fetch data:", error);
            set({ loading: false });
        }
    },
}));

export default useHoldingStore;