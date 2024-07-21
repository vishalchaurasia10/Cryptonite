import { create } from "zustand";
// import { jsonData } from "@/util/market";

interface CoinData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

interface HomeGraphState {
    data: { btc: CoinData, eth: CoinData, ltc: CoinData };
    fetchData: () => void;
}

const useHomeGraphStore = create<HomeGraphState>((set) => ({
    data: {
        btc: { prices: [], market_caps: [], total_volumes: [] },
        eth: { prices: [], market_caps: [], total_volumes: [] },
        ltc: { prices: [], market_caps: [], total_volumes: [] },
    },
    fetchData: async () => {
        const coins = ['bitcoin', 'ethereum', 'litecoin'];
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/';
        const range = `/market_chart?vs_currency=usd&days=365`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!,
            },
        };

        const fetchWithRetry = async (url: string, options: RequestInit, retries: number = 3, backoff: number = 3000): Promise<any> => {
            try {
                const response = await fetch(url, options);
                if (response.status === 429 && retries > 0) {
                    // Wait for the backoff period before retrying
                    await new Promise(res => setTimeout(res, backoff));
                    // Retry with exponential backoff
                    return fetchWithRetry(url, options, retries - 1, backoff * 2);
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            } catch (error) {
                if (retries === 0) {
                    throw error;
                }
                await new Promise(res => setTimeout(res, backoff));
                return fetchWithRetry(url, options, retries - 1, backoff * 2);
            }
        };

        try {
            const data = await Promise.all(coins.map(async (coin) => {
                const result = await fetchWithRetry(`${apiUrl}${coin}${range}`, options);
                return {
                    [coin]: {
                        prices: result.prices,
                        market_caps: result.market_caps,
                        total_volumes: result.total_volumes
                    }
                };
            }));

            set({
                data: {
                    btc: data.find(d => d.bitcoin)!.bitcoin,
                    eth: data.find(d => d.ethereum)!.ethereum,
                    ltc: data.find(d => d.litecoin)!.litecoin,
                }
            });
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useHomeGraphStore;