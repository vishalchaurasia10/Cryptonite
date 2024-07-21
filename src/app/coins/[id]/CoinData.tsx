'use client'
import React, { useEffect, useState } from 'react'
import CoinGraph from './CoinGraph'
import CoinInfo from './CoinInfo'
import CoinHeader from './CoinHeader';

interface MarketData {
    current_price: { usd: number };
    low_24h: { usd: number };
    high_24h: { usd: number };
    market_cap: { usd: number };
    fully_diluted_valuation: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    price_change_percentage_24h: number;
}

export interface CoinData {
    name: string;
    id: string;
    description: { en: string };
    market_data: MarketData;
    image: { thumb: string };
}

const CoinData = ({ id }: { id: string }) => {
    const [coin, setCoin] = useState<CoinData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY_2!
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resData = await response.json();
                console.log(resData)
                setCoin(resData);
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        }
        fetchData()
    }, [id]);

    return (
        <div className="w-full p-3 lg:flex lg:flex-col justify-center items-center">
            <CoinHeader coin={coin} />
            <CoinGraph id={id} />
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinData
