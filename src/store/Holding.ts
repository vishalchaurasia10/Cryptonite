import { create } from "zustand";
// import { companyHolding } from "@/util/market";

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
    fetchData: () => void;
}

const useHoldingStore = create<HoldingState>((set) => ({
    data: { btc: [], eth: [] },
    fetchData: async () => {
        const coins = ['bitcoin', 'ethereum'];
        const apiUrl = 'https://api.coingecko.com/api/v3/companies/public_treasury/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!,
            },
        };

        try {
            const fetchPromises = coins.map((coin) =>
                fetch(`${apiUrl}${coin}`, options).then((res) => res.json())
            );
            const [btcData, ethData] = await Promise.all(fetchPromises);

            const processCoinData = (coinData: any): CoinHolding[] => {
                return coinData.map((item: any) => ({
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
                    btc: processCoinData(btcData.companies),
                    eth: processCoinData(ethData.companies),
                },
            });
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    },
}));

export default useHoldingStore;