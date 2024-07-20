'use client'
import React, { useEffect, useState } from 'react'

interface MarketData {
    low_24h: { usd: number };
    high_24h: { usd: number };
    market_cap: { usd: number };
    fully_diluted_valuation: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
}

interface CoinData {
    name: string;
    description: { en: string };
    market_data: MarketData;
}

const CoinInfo = ({ id }: { id: string }) => {
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
        <div>
            {coin && (
                <>
                    <div className='performances'>
                        <p>Performances</p>
                        <div>
                            <p>
                                <span>Today&apos;s Low</span>
                                <span>{coin.market_data.low_24h.usd}</span>
                            </p>
                            <p>
                                <span>Today&apos;s High</span>
                                <span>{coin.market_data.high_24h.usd}</span>
                            </p>
                        </div>
                    </div>
                    <div className="fundamentals">
                        <h2>Fundamentals</h2>
                        <div>
                            <span>Marketcap: </span>
                            <span>{coin.market_data.market_cap.usd}</span>
                        </div>
                        <div>
                            <span>Fully Diluted Valuation: </span>
                            <span>{coin.market_data.fully_diluted_valuation.usd}</span>
                        </div>
                        <div>
                            <span>24 Hour Trading Vol: </span>
                            <span>{coin.market_data.total_volume.usd}</span>
                        </div>
                        <div>
                            <span>Circulating Supply: </span>
                            <span>{coin.market_data.circulating_supply}</span>
                        </div>
                        <div>
                            <span>Total Supply: </span>
                            <span>{coin.market_data.total_supply}</span>
                        </div>
                        <div>
                            <span>Max Supply: </span>
                            <span>{coin.market_data.max_supply}</span>
                        </div>
                    </div>
                    <div className="description">
                        <h2>About {coin.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
                    </div>
                </>
            )}
        </div>
    )
}

export default CoinInfo