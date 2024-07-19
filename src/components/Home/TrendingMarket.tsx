'use client'
import useTrendingStore from '@/store/Trending'
import Image from 'next/image'
import React, { useEffect } from 'react'

const TrendingMarket = () => {

    const { data, fetchData } = useTrendingStore((state) => state)

    useEffect(() => {
        if (data.length === 0) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className='font-poppins w-full border border-gray-200'>
            <div className='flex justify-between items-center'>
                <p className='font-bold'>Trending Market</p>
                <p>View more coins</p>
            </div>
            <table className="table table-md">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Symbol</th>
                        <th>Last Price</th>
                        <th>24H Change</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin, index) => (
                        <tr key={coin.id}>
                            <td className='flex space-x-2 items-center'>
                                <Image className='h-4 w-4 rounded-full' src={coin.thumb} width={100} height={100} alt={coin.name} />
                                <span>{coin.name}</span>
                            </td>
                            <td>{coin.symbol}</td>
                            <td>${coin.price.toFixed(2)}</td>
                            <td>{coin.change.toFixed(2)}%</td>
                            <td>{coin.market_cap}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TrendingMarket
