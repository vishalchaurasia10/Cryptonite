import useWatchlistStore from '@/store/Watchlist'
import Image from 'next/image';
import React from 'react'
import { formatYAxis } from '../Home/HomeGraphComponent';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const WatchListSideMenu = () => {

    const { data } = useWatchlistStore((state) => state);

    return (
        <div className='overflow-x-auto font-poppins'>
            <table className="table table-md">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24H</th>
                        <th>Marketcap</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin, index) => (
                        <tr key={index}
                        >
                            <td className='flex space-x-2 items-center'>
                                <Image className='h-4 w-4 rounded-full' src={coin.image} width={100} height={100} alt={coin.name} />
                                <span>{coin.name}</span>
                            </td>
                            <td>${coin.current_price.toFixed(2)}</td>
                            <td className={`${coin.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'} flex items-center font-medium`}>
                                {
                                    coin.price_change_24h < 0 ? <BsArrowDown className='text-red-500' /> : <BsArrowUp className='text-green-500' />
                                }
                                <span>
                                    {Math.abs(parseFloat(coin.price_change_24h.toFixed(2)))}%
                                </span>
                            </td>
                            <td>${formatYAxis(coin.market_cap)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WatchListSideMenu
