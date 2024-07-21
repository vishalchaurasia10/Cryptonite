import useWatchlistStore from '@/store/Watchlist'
import Image from 'next/image';
import React from 'react'
import { formatYAxis } from '@/app/home/HomeGraphComponent';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const WatchListSideMenu = () => {

    const { data } = useWatchlistStore((state) => state);

    return (
        <div className='overflow-x-auto font-poppins'>
            <div className='flex justify-between items-center px-2 pb-5'>
                <p className=' font-bold text-lg lg:text-2xl'>Watchlist</p>
                <Link href='/watchlist'>
                    <p className='flex group hover:bg-slate-200 p-2 lg:px-4 rounded-full items-center lg:space-x-1 text-slate-500 font-poppins transition-all duration-300'>
                        <span className='font-bold whitespace-nowrap'>View All</span>
                        <FaChevronRight className='group-hover:translate-x-0.5 transition-all duration-300' />
                    </p>
                </Link>
            </div>
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
                            <Link href={`/coins/${coin.id}`}>
                                <td className='flex space-x-2 items-center'>
                                    <Image className='h-4 w-4 rounded-full' src={coin.image} width={100} height={100} alt={coin.name} />
                                    <span>{coin.name}</span>
                                </td>
                            </Link>
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
