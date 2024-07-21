import { create } from "zustand";

interface SearchState {
    query: string;
    suggestions: any[];
    loading: boolean;
    fetchSuggestions: (query: string) => void;
    setQuery: (query: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    query: '',
    suggestions: [],
    loading: false,
    fetchSuggestions: async (query: string) => {
        if (!query) {
            set({ suggestions: [], loading: false });
            return;
        }

        const apiUrl = `https://api.coingecko.com/api/v3/search?query=${query}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!
            }
        };

        set({ loading: true });

        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            const suggestions = resData.coins.map((coin: any) => ({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                thumb: coin.thumb
            }));
            set({ suggestions, loading: false });
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
            set({ suggestions: [], loading: false });
        }
    },
    setQuery: (query: string) => set({ query })
}));

export default useSearchStore;